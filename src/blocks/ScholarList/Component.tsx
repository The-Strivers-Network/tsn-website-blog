import React from 'react'
import { ArrowUpRight } from 'lucide-react'

import type { ScholarListBlock as ScholarListBlockProps } from '@/payload-types'

import { Eyebrow } from '@/components/ui/eyebrow'
import { CMSLink } from '@/components/Link'

export const ScholarListBlock: React.FC<ScholarListBlockProps> = (props) => {
  const { badge, heading, description, groups } = props

  return (
    <div className="w-full py-16 lg:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col">
            {badge && (
              <div>
                <Eyebrow variant="award">{badge}</Eyebrow>
              </div>
            )}
            <div className="flex gap-2 flex-col">
              {heading && (
                <h4 className="font-display text-display-md md:text-display-lg max-w-xl text-left">
                  {heading}
                </h4>
              )}
              {description && (
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {groups?.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
                  {group.groupName}
                </h3>
                <div className="flex flex-col">
                  {group.scholars?.map((scholar, scholarIndex) => {
                    const { name, school, field, link } = scholar
                    const hasLink = Boolean(link && (link.url || link.reference))

                    const meta = [school, field].filter(Boolean)

                    return (
                      <div
                        key={scholarIndex}
                        className="flex flex-col gap-1 border-t py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                      >
                        {hasLink ? (
                          <CMSLink
                            {...link}
                            appearance="inline"
                            className="group inline-flex items-center gap-1.5 text-lg font-medium transition-colors hover:text-primary"
                          >
                            {name}
                            <ArrowUpRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                          </CMSLink>
                        ) : (
                          <span className="text-lg font-medium">{name}</span>
                        )}

                        {meta.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {meta.join(' · ')}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
