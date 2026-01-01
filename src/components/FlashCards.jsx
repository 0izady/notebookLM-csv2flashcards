import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import MathText from './MathText.jsx'

/**
 * Expects csv_data as an array of objects like in the provided json.
 * For each row:
 * The FIRST key is a "title" and is ignored.
 * The second key is the QUESTION.
 * The second value is the ANSWER.
 * Keys and order are mandatory for correct parsing.
 */
export default function FlashCards({ csv_data }) {
  // Each card: { q: string, a: string }
  const cards = useMemo(() => {
    if (!Array.isArray(csv_data)) return []

    return csv_data
      .map(row => {
        if (!row || typeof row !== 'object') return null

        const entries = Object.entries(row)

        // Must have at least 2 columns
        if (entries.length < 2) return null

        const question = entries[0][1]
        const answer = entries[1][1]

        if (
          typeof question === 'string' &&
          typeof answer === 'string' &&
          question.trim() &&
          answer.trim()
        ) {
          return {
            q: question.trim(),
            a: answer.trim(),
          }
        }

        return null
      })
      .filter(Boolean)
  }, [csv_data])


  const [index, setIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const card = cards[index] || { q: "No cards found.", a: "" }

  const next = () => {
    setShowAnswer(false)
    setIndex(prev => cards.length === 0 ? 0 : (prev + 1) % cards.length)
  }

  const prev = () => {
    setShowAnswer(false)
    setIndex(prev => {
      if (cards.length === 0) return 0;
      return prev === 0 ? cards.length - 1 : prev - 1
    })
  }

  // Defensive rendering for 0-card case
  if (!cards.length) {
    return (
      <div className="flex flex-col items-center gap-6 mt-12">
        <div className="w-96 h-56 bg-gray-900 border border-primary/40 rounded-2xl flex items-center justify-center text-center p-6 shadow-xl">
          <p className="text-xl text-gray-300 font-bold">هیچ فلش‌کاردی یافت نشد.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-12">

      {/* Card */}
      <motion.div
        onClick={() => setShowAnswer(!showAnswer)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-96 h-56 bg-gray-900 border border-primary/40 rounded-2xl flex items-center justify-center text-center cursor-pointer p-6 shadow-xl transition-all"
        tabIndex={0}
        role="button"
        aria-label="Show Answer"
        onKeyDown={e => {
          if (e.key === " " || e.key === "Enter") setShowAnswer(a => !a)
        }}
      >
        <p className="text-xl text-gray-100 font-semibold rtl">
          <MathText text={showAnswer ? card.a : card.q} />
        </p>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center gap-8">
        <button
          onClick={prev}
          className="p-3 rounded-full bg-primary/20 hover:bg-primary/40 transition"
          aria-label="Previous"
        >
          <ChevronLeft />
        </button>

        <span className="text-gray-400 text-sm">
          {cards.length > 0 ? (index + 1) : 0} / {cards.length}
        </span>

        <button
          onClick={next}
          className="p-3 rounded-full bg-primary/20 hover:bg-primary/40 transition"
          aria-label="Next"
        >
          <ChevronRight />
        </button>
      </div>

    </div>
  )
}
