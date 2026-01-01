import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import FlashCards from './FlashCards'
import Papa from 'papaparse';

function CsvUploader() {
  const [uploadState, setUploadState] = useState('idle');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);
  const [show_flashcards, set_show_flashcards] = useState(false)
  const [csv_data, set_csv_data] = useState(null)

  const handleDragOver = (e) => {
    e.preventDefault();
    setUploadState('dragover');
  };

  const handleDragLeave = () => {
    setUploadState('idle');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  };

  const readCSV = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        console.log(results.data)
        set_csv_data(results.data)
        setUploadState('idle')
      }
    })
  }

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name);
        setUploadState('success');
        setTimeout(() => {
          readCSV(file);
        }, 3000);
      } else {
        setUploadState('error');
        setTimeout(() => {
          setUploadState('idle');
        }, 3000);
      }
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const getBorderColor = () => {
    switch (uploadState) {
      case 'dragover':
        return 'border-primary border-2';
      case 'success':
        return 'border-success border-2';
      case 'error':
        return 'border-warning border-2';
      default:
        return 'border-border/50';
    }
  };

  const getBackgroundColor = () => {
    switch (uploadState) {
      case 'dragover':
        return 'bg-primary/10';
      case 'success':
        return 'bg-success/10';
      case 'error':
        return 'bg-warning/10';
      default:
        return 'bg-tertiary/50';
    }
  };

  const getGlowEffect = () => {
    switch (uploadState) {
      case 'dragover':
        return 'glow shadow-lg shadow-primary/30';
      case 'success':
        return 'shadow-lg shadow-success/30';
      case 'error':
        return 'shadow-lg shadow-warning/30';
      default:
        return '';
    }
  };

  if (show_flashcards) {
    return <FlashCards csv_data={csv_data} />
  }

  return (
    <>
      <motion.div
        className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out ${getBorderColor()} ${getBackgroundColor()} ${getGlowEffect()} p-12 cursor-pointer hover:border-primary/70 hover:bg-primary/5 glass glass-border`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Upload CSV file"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileInput}
          className="hidden"
          aria-label="File input"
        />

        <div className="flex flex-col items-center justify-center space-y-6">
          <AnimatePresence mode="wait">
            {uploadState === 'success' ? (
              <motion.div
                key="success"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-success relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-success/20 rounded-full blur-xl"
                />
                <CheckCircle className="w-20 h-20 relative z-10" strokeWidth={2} />
              </motion.div>
            ) : uploadState === 'error' ? (
              <motion.div
                key="error"
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -180 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="text-warning relative"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}
                  className="absolute inset-0 bg-warning/20 rounded-full blur-xl"
                />
                <AlertCircle className="w-20 h-20 relative z-10" strokeWidth={2} />
              </motion.div>
            ) : uploadState === 'dragover' ? (
              <motion.div
                key="dragover"
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-primary relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  className="absolute inset-0 bg-primary/30 rounded-full blur-2xl"
                />
                <Upload className="w-20 h-20 relative z-10" strokeWidth={2} />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ scale: 1 }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="text-gray-300 relative"
              >
                <FileText className="w-20 h-20" strokeWidth={1.5} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center space-y-3">
            <AnimatePresence mode="wait">
              {uploadState === 'success' ? (
                <motion.div
                  key="success-text"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <p className="text-sm text-gray-400 mb-4">
                    File processed successfully
                  </p>

                </motion.div>
              ) : uploadState === 'error' ? (
                <motion.div
                  key="error-text"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  <p className="text-xl font-semibold text-warning mb-2">
                    Invalid file type
                  </p>
                  <p className="text-sm text-gray-400">Please upload a valid CSV file</p>
                </motion.div>
              ) : (
                <motion.div
                  key="idle-text"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <p className="text-xl md:text-2xl font-semibold text-gray-100">
                    {uploadState === 'dragover' ? (
                      <span className="gradient-text-primary">Drop your CSV file here</span>
                    ) : (
                      <>
                        Drag and drop your <span className="text-primary">CSV file</span> here
                      </>
                    )}
                  </p>
                  <p className="text-base text-gray-400 font-light">or click to browse</p>
                </motion.div>
              )}
            </AnimatePresence>

            {fileName && uploadState === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg inline-block"
              >
                <p className="text-sm font-medium text-primary flex items-center gap-2">
                  <button
                    onClick={() => set_show_flashcards(true)}
                    className="text-sm font-medium text-primary flex items-center gap-2"
                  >
                    See Flashcards →
                  </button>
                </p>
              </motion.div>
            )}
          </div>

        </div>
      </motion.div>
    </>
  )
}

export default CsvUploader
