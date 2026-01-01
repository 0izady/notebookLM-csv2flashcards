import { InlineMath, BlockMath } from 'react-katex'

export default function MathText({ text }) {
  if (typeof text !== 'string') return null

  // Split text by inline math $
  const parts = text.split(/(\$[^$]+\$)/g)

  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith('$') && part.endsWith('$')) {
          const math = part.slice(1, -1)
          return <InlineMath key={i}>{math}</InlineMath>
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}
