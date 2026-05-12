'use client'

import * as React from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'

import type { ParagraphBlock as ParagraphBlockProps } from '@/payload-types'

interface WordProps {
  children: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  progress: any
  range: number[]
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1])

  return (
    <span className="relative mt-[12px] mr-1 text-3xl font-semibold">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  )
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ text }) => {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = text?.split(' ') ?? []

  return (
    <p ref={container} className="flex flex-wrap leading-[0.5] p-4 container mx-auto">
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}
