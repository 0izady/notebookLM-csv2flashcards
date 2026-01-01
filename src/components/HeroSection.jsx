import { motion } from 'framer-motion';
import CsvUploader from './CsvUploader';

function HeroSection() {

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden" id="home">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <motion.video
            alt="abstract dark waves"
            src="https://c.animaapp.com/mjuffkmjOaYj30/img/ai_1.mp4"
            poster="https://c.animaapp.com/mjuffkmjOaYj30/img/ai_1-poster.png"
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="max-w-5xl mx-auto space-y-8"
          >
            {/* Title with Aurora Effect */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold text-gray-50 leading-tight"
            >
              <span className="inline-block">Flashcards</span>{' '}
              <motion.span
                className="aurora-text inline-block"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                Reinvented
              </motion.span>
            </motion.h1>

            {/* Subtitle with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 max-w-3xl mx-auto font-light leading-relaxed">
                Upload your <span className="text-primary font-medium">CSVs</span> and start learning{' '}
                <span className="gradient-text font-medium">instantly</span>.
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
              >
                Transform your study materials into interactive flashcards with the power of AI
              </motion.p>
            </motion.div>

          </motion.div>

          {/* CSV Uploader */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
            className="mt-16 w-full max-w-2xl"
            id="csv-uploader"
          >
            <CsvUploader />
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default HeroSection
