

import React, { useState, useEffect, useRef } from 'react';
import { Page, RegistrationFormData, Bundle } from '../types';
import Button from '../components/Button';
import InputField from '../components/InputField';
import StepProgressBar from '../components/StepProgressBar';
import Modal from '../components/Modal';
import Toast from '../components/Toast';
import { useTranslation } from '../contexts/LanguageContext';
import Tooltip from '../components/Tooltip';
import InfoIcon from '../components/icons/InfoIcon';
import CheckCircleIcon from '../components/icons/CheckCircleIcon';
import { submitRegistration } from '../services/api.js';

interface RegistrationPageProps {
    setPage: (page: Page) => void;
    selectedBundle: Bundle | null;
    setSelectedBundle: (bundle: Bundle | null) => void;
}

const bundleData: Bundle[] = [
    { id: 'vibe-mini-reg', nameKey: 'bundleMiniName', data: '3 GB', price: 10, descriptionKey: 'bundleMiniDesc' },
    { id: 'vibe-regular-reg', nameKey: 'bundleRegularName', data: '7 GB', price: 20, descriptionKey: 'bundleRegularDesc' },
    { id: 'vibe-jumbo-reg', nameKey: 'bundleJumboName', data: '20 GB', price: 50, descriptionKey: 'bundleJumboDesc' },
];

const stepKeys = ["regStepPersonal", "regStepIdentity", "regStepContact", "regStepSecurity", "regStepReview", "regStepVerificationMethod"];

// Icon components defined locally to avoid creating new files
const FaceOutlineIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z
         M4.501 20.118a7.5 7.5 0 0114.998 0
         A17.933 17.933 0 0112 21.75
         c-2.676 0-5.264-.584-7.499-1.632z"
    />
  </svg>
);

const IdCardOutlineIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 21.75z" />
    </svg>
);

const MailIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);

const SmsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H5.25A2.25 2.25 0 003 3.75v16.5a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 20.25V10.5m-10.5 6h9" />
  </svg>
);

const CaptureProgress: React.FC<{ step: number, totalSteps: number }> = ({ step, totalSteps }) => {
    const progress = (step / totalSteps) * 100;
    return (
        <div className="w-full bg-slate-600 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
    );
};


type CameraStep = 'GUIDANCE_FACE' | 'GUIDANCE_ID' | 'GUIDANCE_LIVENESS' | 'CAPTURING' | 'PREVIEW';
type OtpMethod = 'sms' | 'email' | '';

const RegistrationPage: React.FC<RegistrationPageProps> = ({ setPage, selectedBundle, setSelectedBundle }) => {
    const { t } = useTranslation();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<RegistrationFormData>({
        fullName: '', atNumber: '', gender: '', dob: '', location: '',
        idType: 'Ghana Card', idNumber: '', idFront: null, selfieWithId: null,
        nextOfKin: '', customerType: 'Existing', alternativeNumber: '', email: '',
        freqDialedNumber1: '', freqDialedNumber2: '', atMoneyBalance: ''
    });
    const [errors, setErrors] = useState<{ [key in keyof Omit<RegistrationFormData, 'customerType'> | 'otpMethod']?: string }>({});
    const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
    const [otpMethod, setOtpMethod] = useState<OtpMethod>('');
    const [otp, setOtp] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [resendTimer, setResendTimer] = useState(30);
    const [canResendOtp, setCanResendOtp] = useState(false);
    const [isBundleModalOpen, setIsBundleModalOpen] = useState(false);
    const [bundleToConfirmInModal, setBundleToConfirmInModal] = useState<Bundle | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [otpVerificationStatus, setOtpVerificationStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');

    // Camera states and refs
    const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [guidanceMessage, setGuidanceMessage] = useState('');
    const [cameraStep, setCameraStep] = useState<CameraStep>('GUIDANCE_FACE');
    const [livenessAction, setLivenessAction] = useState<'blink' | 'smile'>('blink');

    const steps = stepKeys.map(key => t(key));

    const ProcessingIndicator: React.FC = () => {
        const [progress, setProgress] = useState(0);

        useEffect(() => {
            if (!isProcessing) return;
            const duration = 5000; // Animate over 5 seconds
            const intervalTime = 50;
            const increment = (100 / (duration / intervalTime));

            const interval = setInterval(() => {
                setProgress(prev => Math.min(100, prev + increment));
            }, intervalTime);

            return () => clearInterval(interval);
        }, [isProcessing]);

        return (
            <div className="flex flex-col items-center justify-center space-y-4 my-8 animate-fade-in-up">
                <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">{t('processingInformation')}</h2>
                <div className="w-full bg-slate-200 dark:bg-slate-600 rounded-full h-2.5">
                    <div 
                        className="bg-red-600 h-2.5 rounded-full" 
                        style={{ width: `${progress}%`, transition: 'width 0.05s linear' }}
                    ></div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{t('processingInformationSubtitle')}</p>
            </div>
        );
    };
    
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | undefined;
        if (isOtpModalOpen && resendTimer > 0) {
            setCanResendOtp(false);
            interval = setInterval(() => {
                setResendTimer(prev => prev - 1);
            }, 1000);
        } else if (resendTimer === 0) {
            setCanResendOtp(true);
            if (interval) clearInterval(interval);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isOtpModalOpen, resendTimer]);

    // Effect to manage camera stream
    useEffect(() => {
        let stream: MediaStream | undefined;
        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setToast({ message: t('cameraAccessError'), type: 'error' });
                setIsCameraModalOpen(false);
            }
        };
        
        if (isCameraModalOpen) {
            startCamera();
        }

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraModalOpen]);

    // Effect to reset camera state when modal opens
    useEffect(() => {
        if (isCameraModalOpen) {
            setCameraStep('GUIDANCE_FACE');
            setCapturedImage(null);
            setLivenessAction(Math.random() > 0.5 ? 'blink' : 'smile');
        }
    }, [isCameraModalOpen]);

    // Effect to run the camera guidance sequence
    useEffect(() => {
        if (!isCameraModalOpen || cameraStep === 'PREVIEW') return;

        let timeoutId: number;

        const advanceStep = (nextStep: CameraStep, delay: number) => {
            timeoutId = window.setTimeout(() => setCameraStep(nextStep), delay);
        };

        switch (cameraStep) {
            case 'GUIDANCE_FACE':
                setGuidanceMessage(t('cameraGuideFitFace'));
                advanceStep('GUIDANCE_ID', 3000);
                break;
            case 'GUIDANCE_ID':
                setGuidanceMessage(t('cameraGuideFitId'));
                advanceStep('GUIDANCE_LIVENESS', 3000);
                break;
            case 'GUIDANCE_LIVENESS':
                const actionKey = livenessAction === 'blink' ? 'cameraGuideLivenessBlink' : 'cameraGuideLivenessSmile';
                setGuidanceMessage(t(actionKey));
                advanceStep('CAPTURING', 2500);
                break;
            case 'CAPTURING':
                setGuidanceMessage(t('cameraGuideSuccess'));
                handleCapture();
                // Short delay to show "Capturing..." message then move to preview
                timeoutId = window.setTimeout(() => setCameraStep('PREVIEW'), 1000);
                break;
        }

        return () => clearTimeout(timeoutId);

    }, [isCameraModalOpen, cameraStep, livenessAction, t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        if (id === 'fullName' || id === 'nextOfKin') {
            const textValue = value.replace(/[^a-zA-Z\s]/g, '');
            setFormData(prev => ({ ...prev, [id]: textValue }));
        } else if (id === 'atNumber' || id === 'freqDialedNumber1' || id === 'freqDialedNumber2' || id === 'alternativeNumber') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [id]: numericValue.slice(0, 10) }));
        } else if (id === 'atMoneyBalance') {
            const numericValue = value.replace(/[^0-9]/g, '');
            setFormData(prev => ({ ...prev, [id]: numericValue.slice(0, 5) }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value as any }));
        }

        if (errors[id as keyof typeof errors]) {
            setErrors(prev => ({...prev, [id]: undefined}));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === 'email') {
            // Don't show an error if the field is empty, the 'required' validation on submit will catch it.
            // Only show the 'invalid format' error if there is some text that doesn't match.
            if (value && !/\S+@\S+\.\S+/.test(value)) {
                setErrors(prev => ({ ...prev, email: t('errorEmailInvalid') }));
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, files } = e.target;
        if (files && files.length > 0) {
            setFormData(prev => ({ ...prev, [id]: files[0] }));
        }
    };
    
    const validateStep = () => {
        const newErrors: { [key in keyof Omit<RegistrationFormData, 'customerType'> | 'otpMethod']?: string } = {};
        if (currentStep === 1) {
            if (!formData.fullName) {
                newErrors.fullName = t('errorFullNameRequired');
            } else if (/[^a-zA-Z\s]/.test(formData.fullName)) {
                newErrors.fullName = t('errorFullNameInvalid');
            }
            if (!formData.atNumber) newErrors.atNumber = t('errorAtNumberRequired');
            if (!formData.gender) newErrors.gender = t('errorGenderRequired');
            if (!formData.dob) {
                newErrors.dob = t('errorDobRequired');
            } else {
                const selectedYear = new Date(formData.dob).getFullYear();
                if (selectedYear > 2019) {
                    newErrors.dob = t('errorDobYearInvalid');
                }
            }
            if (!formData.location) newErrors.location = t('errorLocationRequired');
        }
        if (currentStep === 2) {
            if (!formData.idNumber) newErrors.idNumber = t('errorIdNumberRequired');
            else if (formData.idNumber.length !== 15) newErrors.idNumber = t('errorIdNumberLength');
            if (!formData.idFront) newErrors.idFront = t('errorIdFrontRequired');
            if (!formData.selfieWithId) newErrors.selfieWithId = t('errorSelfieWithIdRequired');
        }
        if (currentStep === 3) {
            if (!formData.email) newErrors.email = t('errorEmailRequired');
            else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t('errorEmailInvalid');
            if (!formData.alternativeNumber) newErrors.alternativeNumber = t('errorAltNumberRequired');
            if (formData.nextOfKin && /[^a-zA-Z\s]/.test(formData.nextOfKin)) {
                newErrors.nextOfKin = t('errorNextOfKinInvalid');
            }
        }
        if (currentStep === 4) {
            if (!formData.freqDialedNumber1) newErrors.freqDialedNumber1 = t('errorFreqDialed1Required');
            if (!formData.freqDialedNumber2) newErrors.freqDialedNumber2 = t('errorFreqDialed2Required');
            if (!formData.atMoneyBalance) newErrors.atMoneyBalance = t('errorAtMoneyBalanceRequired');
        }
        if (currentStep === 6) {
            if (!otpMethod) newErrors.otpMethod = t('errorOtpMethodRequired');
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep()) {
            if (currentStep === 4) { // After Security step
                if (!selectedBundle) { // Only show modal if no bundle is selected yet.
                    setBundleToConfirmInModal(selectedBundle);
                    setIsBundleModalOpen(true);
                } else {
                    setCurrentStep(prev => prev + 1); // If bundle already selected, just proceed to review
                }
            } else if (currentStep < steps.length) {
                setCurrentStep(prev => prev + 1);
            } else { // This is on step 6, the verification step
                // Open the OTP modal directly
                setResendTimer(30);
                setCanResendOtp(false);
                setOtp('');
                setOtpVerificationStatus('idle');
                setIsOtpModalOpen(true);
                console.log("Form submitted:", formData);
            }
        }
    };
    
    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        } else {
            setPage('home');
        }
    };
    
    const handleEditStep = (step: number) => {
        setCurrentStep(step);
    };

    const handleFormSubmission = async () => {
        setIsProcessing(true);
        try {
            const result = await submitRegistration(formData);
            if (result.success) {
                setToast({ message: result.message || t('registrationSuccessMessage'), type: 'success' });
                
                setTimeout(() => {
                    setIsProcessing(false);
                    if (formData.customerType === 'Existing') {
                        setPage('activation');
                    } else {
                        if (selectedBundle) {
                            setPage('payment');
                        } else {
                            setPage('bundles');
                        }
                    }
                }, 1500);

            } else {
                throw new Error(result.message || 'Submission failed. Please try again.');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred during submission.';
            console.error("Submission failed:", error);
            setToast({ message: errorMessage, type: 'error' });
            setIsProcessing(false);
        }
    };

    const handleOtpSubmit = () => {
        if (otpVerificationStatus !== 'idle') return;

        if (otp === "123456") {
            setOtpVerificationStatus('verifying');
            setTimeout(() => {
                setOtpVerificationStatus('verified');
                setTimeout(() => {
                    setIsOtpModalOpen(false);
                    handleFormSubmission();
                }, 1500);
            }, 1000);
        } else {
            setToast({ message: t('errorInvalidOtp'), type: 'error' });
        }
    };

    const handleResendOtp = () => {
        if (canResendOtp) {
            setResendTimer(30);
            setCanResendOtp(false);
            setToast({ message: t('otpResent'), type: 'success' });
        }
    };
    
    const dataURLtoFile = (dataUrl: string, filename: string): File => {
        const arr = dataUrl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) throw new Error('Invalid data URL');
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const handleOpenCam = () => {
        setIsCameraModalOpen(true);
    };

    const handleCapture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.translate(video.videoWidth, 0);
                context.scale(-1, 1);
                context.filter = 'contrast(1.2) brightness(1.1) saturate(1.1)';
                context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
                setCapturedImage(dataUrl);
                context.filter = 'none';
                context.setTransform(1, 0, 0, 1, 0, 0);
            }
        }
    };
    
    const handleRetake = () => {
        setCapturedImage(null);
        setCameraStep('GUIDANCE_FACE');
    };

    const handleAcceptPicture = () => {
        if (capturedImage) {
            const imageFile = dataURLtoFile(capturedImage, 'selfie-with-id.jpg');
            setFormData(prev => ({ ...prev, selfieWithId: imageFile }));
            setIsCameraModalOpen(false);
        }
    };

    const maskEmail = (email: string) => {
        if (!email.includes('@')) return email;
        const [name, domain] = email.split('@');
        const maskedName = name.length > 2 ? name.substring(0, 2) + '*'.repeat(Math.max(0, name.length - 2)) : name;
        const maskedDomain = domain.length > 5 ? domain.substring(0, 2) + '*'.repeat(Math.max(0, domain.length - 4)) + domain.slice(-2) : domain;
        return `${maskedName}@${maskedDomain}`;
    };

    const maskPhone = (phone: string) => {
        if (phone.length < 10) return phone;
        return phone.substring(0, 3) + '****' + phone.substring(7);
    };

    const handleBundleSelect = (bundle: Bundle) => {
        setBundleToConfirmInModal(bundle);
    };

    const handleSkipOrCloseBundleModal = () => {
        setSelectedBundle(null);
        setBundleToConfirmInModal(null);
        setIsBundleModalOpen(false);
        if (currentStep === 4) {
            setCurrentStep(5);
        }
    };

    const handleConfirmBundle = () => {
        setSelectedBundle(bundleToConfirmInModal);
        setIsBundleModalOpen(false);
        if (currentStep === 4) {
            setCurrentStep(5);
        }
    };

    const ReviewDetail: React.FC<{ label: string; value?: string }> = ({ label, value }) => (
        <div className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-slate-200 dark:border-slate-700">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:mt-0 font-semibold text-left sm:text-right">{value || 'Not provided'}</dd>
        </div>
    );
    
    const ReviewImageDetail: React.FC<{ label: string; file: File | null }> = ({ label, file }) => (
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-3 border-b border-slate-200 dark:border-slate-700">
            <dt className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2 sm:mb-0">{label}</dt>
            <dd className="mt-1 text-sm text-slate-900 dark:text-white sm:mt-0 text-left sm:text-right w-full sm:w-auto">
                {file ? (
                    <img src={URL.createObjectURL(file)} alt={`${label} preview`} className="h-20 w-auto max-w-full rounded-lg object-contain inline-block" />
                ) : (
                    <span className="font-semibold">Not provided</span>
                )}
            </dd>
        </div>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <InputField label={t('fullName')} id="fullName" value={formData.fullName} onChange={handleChange} error={errors.fullName} required maxLength={50} />
                        <InputField label={t('atNumber')} id="atNumber" type="tel" value={formData.atNumber} onChange={handleChange} error={errors.atNumber} placeholder="enter your AT Number here" maxLength={10} required />
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('gender')}</label>
                            <select id="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded-md dark:bg-slate-700 border-slate-300 dark:border-slate-600" required>
                                <option value="">{t('selectGender')}</option>
                                <option value="Male">{t('male')}</option>
                                <option value="Female">{t('female')}</option>
                                <option value="Other">{t('other')}</option>
                            </select>
                            {errors.gender && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.gender}</p>}
                        </div>
                        <InputField label={t('dateOfBirth')} id="dob" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} max="2019-12-31" required />
                        <InputField label={t('locationCity')} id="location" value={formData.location} onChange={handleChange} error={errors.location} required maxLength={50} />
                    </div>
                );
            case 2:
                 return (
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('nationalIdType')}</label>
                            <p className="text-sm text-red-600 dark:text-red-500 mt-1">{t('ghanaCardOnlyNote')}</p>
                        </div>
                        <InputField label={t('idNumber')} id="idNumber" value={formData.idNumber} onChange={handleChange} error={errors.idNumber} placeholder="GHA-XXXXXXXXX-X" maxLength={15} required />
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('uploadIdFront')}</label>
                            <input id="idFront" type="file" onChange={handleFileChange} accept="image/*" className="w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 dark:file:bg-red-500/10 dark:file:text-red-300 dark:hover:file:bg-red-500/20" required/>
                            {formData.idFront && <span className="text-xs text-slate-500 dark:text-slate-400">{formData.idFront.name}</span>}
                            {errors.idFront && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.idFront}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('selfieWithIdTitle')}</label>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{t('selfieWithIdInstructions')}</p>
                            {formData.selfieWithId ? (
                                <div className="flex items-center gap-4">
                                    <img src={URL.createObjectURL(formData.selfieWithId)} alt="Selfie with ID" className="h-20 w-20 rounded-lg object-cover" />
                                    <Button variant="secondary" onClick={handleOpenCam}>{t('retakeButton')}</Button>
                                </div>
                            ) : (
                                <Button variant="secondary" onClick={handleOpenCam} className="w-full">
                                    {t('openCameraButton')}
                                </Button>
                            )}
                            {errors.selfieWithId && <p className="mt-1 text-xs text-red-600 dark:text-red-500">{errors.selfieWithId}</p>}
                        </div>
                    </div>
                );
            case 3:
                return (
                     <div className="space-y-6">
                        <InputField label={t('emailAddress')} id="email" type="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} required />
                        <InputField label={t('altPhoneNumber')} id="alternativeNumber" type="number" value={formData.alternativeNumber} onChange={handleChange} error={errors.alternativeNumber} required />
                        <InputField label={t('nextOfKin')} id="nextOfKin" value={formData.nextOfKin} onChange={handleChange} error={errors.nextOfKin} maxLength={50} />
                         <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('customerType')}</label>
                            <p className="text-sm font-bold text-red-600 dark:text-red-500 mt-1">{t('existingCustomerOnlyNote')}</p>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-6">
                        <div className="p-3 bg-slate-100 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-700">
                            <p className="text-sm text-slate-600 dark:text-slate-300">{t('securityQuestionDescription')}</p>
                        </div>

                        <div>
                            <div className="flex items-center gap-1.5 mb-1">
                                <label htmlFor="freqDialedNumber1" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('freqDialedNumber1')}</label>
                                <Tooltip text={t('freqDialedNumberTooltip')}>
                                    <InfoIcon className="h-4 w-4 text-slate-400" />
                                </Tooltip>
                            </div>
                            <InputField
                                id="freqDialedNumber1"
                                label=""
                                type="tel"
                                value={formData.freqDialedNumber1}
                                onChange={handleChange}
                                error={errors.freqDialedNumber1}
                                placeholder={t('freqDialedNumber1Hint')}
                                maxLength={10}
                                required
                            />
                        </div>
                        
                        <div>
                            <div className="flex items-center gap-1.5 mb-1">
                                <label htmlFor="freqDialedNumber2" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('freqDialedNumber2')}</label>
                                <Tooltip text={t('freqDialedNumberTooltip')}>
                                    <InfoIcon className="h-4 w-4 text-slate-400" />
                                </Tooltip>
                            </div>
                            <InputField
                                id="freqDialedNumber2"
                                label=""
                                type="tel"
                                value={formData.freqDialedNumber2}
                                onChange={handleChange}
                                error={errors.freqDialedNumber2}
                                placeholder={t('freqDialedNumber2Hint')}
                                maxLength={10}
                                required
                            />
                        </div>

                        <InputField
                            label={t('atMoneyBalance')}
                            id="atMoneyBalance"
                            type="number"
                            prefix="₵"
                            value={formData.atMoneyBalance}
                            onChange={handleChange}
                            error={errors.atMoneyBalance}
                            placeholder={t('atMoneyBalanceHint')}
                            required
                        />
                    </div>
                );
            case 5:
                return (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">{t('reviewTitle')}</h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('reviewSubtitle')}</p>
                        </div>

                        {/* Selected Bundle */}
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-red-600">{t('selectedBundle')}</h3>
                                <Button variant="ghost" size="sm" onClick={() => {
                                    setBundleToConfirmInModal(selectedBundle);
                                    setIsBundleModalOpen(true);
                                }}>{selectedBundle ? t('reviewChange') : t('reviewAdd')}</Button>
                            </div>
                            {selectedBundle ? (
                                <dl className="[&>*:last-child]:border-b-0">
                                    <ReviewDetail label={t('bundle')} value={t(selectedBundle.nameKey)} />
                                    <ReviewDetail label={t('data')} value={selectedBundle.data} />
                                    <ReviewDetail label={t('price')} value={`₵${selectedBundle.price.toFixed(2)}`} />
                                </dl>
                            ) : (
                                <p className="text-slate-500 dark:text-slate-400 text-sm">{t('noBundleSelectedReview')}</p>
                            )}
                        </div>

                        {/* Personal Details */}
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-red-600">{t('personalDetails')}</h3>
                                <Button variant="ghost" size="sm" onClick={() => handleEditStep(1)}>{t('reviewEdit')}</Button>
                            </div>
                            <dl className="[&>*:last-child]:border-b-0">
                                <ReviewDetail label={t('fullName')} value={formData.fullName} />
                                <ReviewDetail label={t('atNumber')} value={formData.atNumber} />
                                <ReviewDetail label={t('gender')} value={formData.gender} />
                                <ReviewDetail label={t('dateOfBirth')} value={formData.dob} />
                                <ReviewDetail label={t('locationCity')} value={formData.location} />
                            </dl>
                        </div>

                        {/* Identity Details */}
                         <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-red-600">{t('identityDetails')}</h3>
                                <Button variant="ghost" size="sm" onClick={() => handleEditStep(2)}>{t('reviewEdit')}</Button>
                            </div>
                            <dl className="[&>*:last-child]:border-b-0">
                                <ReviewDetail label={t('idNumber')} value={formData.idNumber} />
                                <ReviewImageDetail label={t('uploadIdFront')} file={formData.idFront} />
                                <ReviewImageDetail label={t('selfieWithIdTitle')} file={formData.selfieWithId} />
                            </dl>
                        </div>
                        
                        {/* Contact Details */}
                         <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-red-600">{t('contactDetails')}</h3>
                                <Button variant="ghost" size="sm" onClick={() => handleEditStep(3)}>{t('reviewEdit')}</Button>
                            </div>
                            <dl className="[&>*:last-child]:border-b-0">
                                <ReviewDetail label={t('emailAddress')} value={formData.email} />
                                <ReviewDetail label={t('altPhoneNumber')} value={formData.alternativeNumber} />
                                <ReviewDetail label={t('nextOfKin')} value={formData.nextOfKin} />
                            </dl>
                        </div>

                        {/* Security Details */}
                        <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-bold text-red-600">{t('securityDetails')}</h3>
                                <Button variant="ghost" size="sm" onClick={() => handleEditStep(4)}>{t('reviewEdit')}</Button>
                            </div>
                            <dl className="[&>*:last-child]:border-b-0">
                                <ReviewDetail label={t('freqDialedNumber1')} value={formData.freqDialedNumber1} />
                                <ReviewDetail label={t('freqDialedNumber2')} value={formData.freqDialedNumber2} />
                                <ReviewDetail label={t('atMoneyBalance')} value={formData.atMoneyBalance ? `₵${formData.atMoneyBalance}` : undefined} />
                            </dl>
                        </div>
                    </div>
                );
            case 6:
                return (
                    <div className="space-y-8 animate-fade-in-up">
                        <div className="text-center">
                            <h2 className="text-2xl font-bold">{t('chooseVerificationMethodTitle')}</h2>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{t('chooseVerificationMethodSubtitle')}</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            {/* Email Option */}
                            <button 
                                type="button"
                                onClick={() => {
                                    setOtpMethod('email');
                                    if (errors.otpMethod) setErrors(prev => ({...prev, otpMethod: undefined}));
                                }}
                                className={`flex-1 p-6 border-2 rounded-lg text-left transition-all duration-200 ${otpMethod === 'email' ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-500'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <MailIcon className="h-10 w-10 text-red-600" />
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{t('sendToEmail')}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{maskEmail(formData.email)}</p>
                                    </div>
                                </div>
                            </button>

                            {/* SMS Option */}
                            <button 
                                type="button"
                                onClick={() => {
                                    setOtpMethod('sms');
                                    if (errors.otpMethod) setErrors(prev => ({...prev, otpMethod: undefined}));
                                }}
                                className={`flex-1 p-6 border-2 rounded-lg text-left transition-all duration-200 ${otpMethod === 'sms' ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-500'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <SmsIcon className="h-10 w-10 text-red-600" />
                                    <div>
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">{t('sendToSms')}</h3>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">{maskPhone(formData.atNumber)}</p>
                                    </div>
                                </div>
                            </button>
                        </div>
                        {errors.otpMethod && <p className="mt-2 text-center text-xs text-red-600 dark:text-red-500">{errors.otpMethod}</p>}
                    </div>
                );
            default:
                return null;
        }
    };
    
    const renderCameraContent = () => {
        const faceDetected = cameraStep !== 'GUIDANCE_FACE';
        const idDetected = cameraStep !== 'GUIDANCE_FACE' && cameraStep !== 'GUIDANCE_ID';
        const livenessDetected = idDetected && cameraStep !== 'GUIDANCE_LIVENESS';

        let progressStep = 0;
        if (cameraStep === 'GUIDANCE_ID') progressStep = 1;
        if (cameraStep === 'GUIDANCE_LIVENESS') progressStep = 2;
        if (cameraStep === 'CAPTURING') progressStep = 3;
        if (cameraStep === 'PREVIEW') progressStep = 4;

        const guidanceIcon = () => {
            if (!faceDetected) return <FaceOutlineIcon className="h-8 w-8 text-slate-300" />;
            if (!idDetected) return <IdCardOutlineIcon className="h-8 w-8 text-slate-300" />;
            return <CheckCircleIcon className="h-8 w-8 text-green-400" />;
        };

        if (cameraStep === 'PREVIEW' && capturedImage) {
            return (
                <div className="flex flex-col items-center gap-4 h-full">
                    <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white">{t('cameraPreviewTitle')}</h2>
                    <p className="text-sm text-center text-slate-500 dark:text-slate-400 mb-2">{t('cameraPreviewSubtitle')}</p>
                    <img src={capturedImage} alt="Captured selfie" className="rounded-lg w-full max-w-sm" />
                    <div className="flex w-full justify-center gap-4 mt-4">
                        <Button variant="secondary" onClick={handleRetake}>{t('retakeButton')}</Button>
                        <Button onClick={handleAcceptPicture}>{t('usePictureButton')}</Button>
                    </div>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center gap-4 h-full">
                <canvas ref={canvasRef} className="hidden"></canvas>
                <div className="relative w-full max-w-sm aspect-[3/4] overflow-hidden rounded-lg bg-slate-900">
                    <video ref={videoRef} autoPlay playsInline muted className="absolute top-0 left-0 w-full h-full object-cover transform -scale-x-100"></video>
                    <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice">
                        <defs>
                            <mask id="guidance-mask">
                                <rect width="300" height="400" fill="white" />
                                <ellipse cx="150" cy="140" rx="70" ry="90" fill="black" />
                                <rect x="75" y="280" width="150" height="95" rx="10" fill="black" />
                            </mask>
                        </defs>
                        <rect width="300" height="400" fill="rgba(0,0,0,0.7)" mask="url(#guidance-mask)" />
                        <ellipse cx="150" cy="140" rx="70" ry="90" fill="none" stroke={faceDetected ? '#4ade80' : '#f87171'} strokeWidth="4" className="transition-all duration-500" />
                        <rect x="75" y="280" width="150" height="95" rx="10" fill="none" stroke={idDetected ? '#4ade80' : '#f87171'} strokeWidth="4" className="transition-all duration-500" />
                    </svg>
                </div>
                <div className="w-full max-w-sm p-4 bg-slate-700/50 rounded-lg text-center backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-4">
                        {guidanceIcon()}
                        <p className="text-white font-medium text-lg">{guidanceMessage}</p>
                    </div>
                    <div className="mt-4">
                        <CaptureProgress step={progressStep} totalSteps={4} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-900 p-4 pt-28 md:pt-24">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 space-y-8">
                <h1 className="text-3xl font-bold text-center text-red-600">{t('regTitle')}</h1>
                <div className="py-4">
                  <StepProgressBar steps={steps} currentStep={currentStep} />
                </div>
                
                <div>
                    {isProcessing ? <ProcessingIndicator /> : renderStepContent()}
                </div>

                {!isProcessing && (
                    <div className="flex justify-between pt-6">
                        <Button variant="secondary" onClick={handleBack}>
                            {currentStep === 1 ? t('backToHome') : t('back')}
                        </Button>
                        <Button onClick={handleNext}>
                            {currentStep === steps.length ? t('submitAndVerify') : t('next')}
                        </Button>
                    </div>
                )}
            </div>

            <Modal isOpen={isBundleModalOpen} onClose={handleSkipOrCloseBundleModal} title={t('addBundleTitle')} size="lg">
                <p className="text-slate-600 dark:text-slate-300 mb-6">{t('addBundleSubtitle')}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {bundleData.map(bundle => {
                        const isSelected = bundleToConfirmInModal?.id === bundle.id;
                        return (
                            <div
                                key={bundle.id}
                                onClick={() => handleBundleSelect(bundle)}
                                className={`p-4 border-2 rounded-lg cursor-pointer transition-all text-center ${isSelected ? 'border-red-500 ring-2 ring-red-500/20 bg-red-50 dark:bg-red-900/20' : 'border-slate-300 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-500'}`}
                                role="button"
                                tabIndex={0}
                                aria-pressed={isSelected}
                            >
                                <h3 className="font-bold text-lg text-red-600">{t(bundle.nameKey)}</h3>
                                <p className="text-2xl font-extrabold text-slate-800 dark:text-white my-1">{bundle.data}</p>
                                <p className="font-bold text-slate-800 dark:text-white">₵{bundle.price}</p>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end space-x-4">
                    <Button variant="secondary" onClick={handleSkipOrCloseBundleModal}>{t('skipForNow')}</Button>
                    <Button onClick={handleConfirmBundle} disabled={!bundleToConfirmInModal}>{t('confirmBundle')}</Button>
                </div>
            </Modal>

            <Modal isOpen={isOtpModalOpen} onClose={() => otpVerificationStatus === 'idle' && setIsOtpModalOpen(false)} title={t('otpVerificationTitle')}>
                 <p className="text-slate-600 dark:text-slate-300 mb-2">
                    {otpMethod === 'email'
                        ? t('otpSentTo', { email: formData.email })
                        : t('otpSentToSms', { phone: formData.atNumber })
                    }
                </p>
                <div className="my-4 p-3 bg-red-100 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg text-center">
                    <p className="text-sm text-red-700 dark:text-red-300">{t('demoOtpMessage')}</p>
                    <p className="text-lg font-bold tracking-widest text-red-800 dark:text-red-200">123456</p>
                </div>
                <InputField
                    label={t('enterOtp')}
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    disabled={otpVerificationStatus !== 'idle'}
                />
                <div className="mt-6 flex items-center justify-between">
                     <div className="text-sm">
                        <button
                            onClick={handleResendOtp}
                            disabled={!canResendOtp || otpVerificationStatus !== 'idle'}
                            className="text-red-600 hover:underline disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
                        >
                            {t('resendOtp')}
                        </button>
                        {!canResendOtp && <span className="ml-2 text-slate-500">{t('inSeconds', { count: resendTimer.toString() })}</span>}
                    </div>
                    <Button
                        onClick={handleOtpSubmit}
                        isLoading={otpVerificationStatus === 'verifying'}
                        disabled={otpVerificationStatus !== 'idle'}
                        className={otpVerificationStatus === 'verified' ? '!bg-green-600 !hover:bg-green-700 !focus:ring-green-500' : ''}
                    >
                         {otpVerificationStatus === 'verified' ? (
                            <>
                                <CheckCircleIcon className="h-5 w-5 mr-2" />
                                {t('verified')}
                            </>
                        ) : t('verifyOtp')}
                    </Button>
                </div>
            </Modal>
            
            {/* The Modal component itself adds padding, so we remove it with negative margins here for a true fullscreen feel */}
            <Modal isOpen={isCameraModalOpen} onClose={() => setIsCameraModalOpen(false)} title="" size="fullscreen">
                <div className="!p-0 !-m-6 bg-slate-800 dark:bg-slate-900 h-full rounded-lg">
                    {renderCameraContent()}
                </div>
            </Modal>
        </div>
    );
};

export default RegistrationPage;