import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiX, FiCheck, FiLoader, FiFile } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export function UploadPage() {
  const [dragover, setDragover] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragover(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragover(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragover(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      handleFile(droppedFile);
    }
  }, []);

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setUploadProgress(i);
    }

    // Navigate to processing page
    setTimeout(() => {
      navigate('/processing');
    }, 500);
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-32 pb-20 px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-electric-cyan/10 border border-electric-cyan/20 mb-6"
          >
            <FiUpload className="w-4 h-4 text-electric-cyan" />
            <span className="text-sm text-electric-cyan">Satellite Image Analysis</span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-white">Upload Your</span>
            <br />
            <span className="gradient-text">Satellite Image</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Drop your satellite imagery and let our AI enhance, colorize,
            and analyze it in real-time.
          </p>
        </motion.div>

        {/* Upload Zone */}
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload-zone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`upload-zone cursor-pointer relative overflow-hidden ${
                dragover ? 'dragover' : ''
              }`}
            >
              {/* Animated Dashed Border */}
              <div className="absolute inset-0 rounded-2xl">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <rect
                    x="4"
                    y="4"
                    width="calc(100% - 8px)"
                    height="calc(100% - 8px)"
                    rx="16"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="20 10"
                    className={`transition-stroke-dashoffset duration-500 ${
                      dragover ? 'animate-spin-slow' : ''
                    }`}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00D4FF" />
                      <stop offset="50%" stopColor="#00F5D4" />
                      <stop offset="100%" stopColor="#7B68EE" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center py-16">
                <motion.div
                  animate={{
                    scale: dragover ? 1.1 : 1,
                    y: dragover ? -5 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-electric-blue/20 to-electric-cyan/20 flex items-center justify-center mb-6"
                  style={{
                    boxShadow: dragover ? '0 0 40px rgba(0, 212, 255, 0.3)' : 'none',
                  }}
                >
                  <FiUpload className="w-10 h-10 text-electric-cyan" />
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-2">
                  Drop your image here
                </h3>
                <p className="text-white/50 mb-4">or click to browse</p>

                <div className="flex flex-wrap justify-center gap-2">
                  {['JPG', 'PNG', 'TIFF', 'GeoTIFF'].map((format) => (
                    <span
                      key={format}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/60"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at center, rgba(0, 212, 255, 0.1), transparent 70%)',
                }}
                animate={{ opacity: dragover ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="preview-zone"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6"
            >
              {/* File Info Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-electric-cyan/20 flex items-center justify-center">
                    <FiFile className="w-5 h-5 text-electric-cyan" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{file.name}</p>
                    <p className="text-sm text-white/50">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {!isUploading && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearFile}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <FiX className="w-5 h-5 text-white/70" />
                  </motion.button>
                )}
              </div>

              {/* Preview Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-space-700 mb-6">
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Upload Progress Overlay */}
                {isUploading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-space-900/80 backdrop-blur-sm flex flex-col items-center justify-center"
                  >
                    <div className="relative mb-6">
                      <svg className="w-32 h-32" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#00D4FF"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeDasharray={`${uploadProgress * 2.83} 283`}
                          transform="rotate(-90 50 50)"
                          style={{
                            transition: 'stroke-dasharray 0.3s ease',
                          }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold gradient-text">
                          {uploadProgress}%
                        </span>
                      </div>
                    </div>

                    {/* Status Text */}
                    <div className="flex items-center gap-2 text-white/70">
                      <FiLoader className="w-5 h-5 animate-spin" />
                      <span>
                        {uploadProgress < 30
                          ? 'Analyzing image...'
                          : uploadProgress < 60
                          ? 'Loading AI models...'
                          : uploadProgress < 90
                          ? 'Preparing processing...'
                          : 'Almost done...'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Progress Bar */}
              {isUploading && (
                <div className="mb-6">
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-electric-blue to-electric-cyan rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              {!isUploading && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUpload}
                  className="w-full btn-primary flex items-center justify-center gap-3"
                >
                  <FiCheck className="w-5 h-5" />
                  <span>Start Processing</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />

        {/* Supported Formats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <h4 className="text-sm text-white/50 mb-4">Supported Formats</h4>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'JPG', desc: 'Joint Photographic' },
              { name: 'PNG', desc: 'Portable Network' },
              { name: 'TIFF', desc: 'Tagged Image' },
              { name: 'GeoTIFF', desc: 'Geospatial Data' },
            ].map((format) => (
              <div
                key={format.name}
                className="glass-card px-4 py-3 text-center min-w-[100px]"
              >
                <div className="font-semibold text-electric-cyan text-sm">
                  {format.name}
                </div>
                <div className="text-xs text-white/40">{format.desc}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
