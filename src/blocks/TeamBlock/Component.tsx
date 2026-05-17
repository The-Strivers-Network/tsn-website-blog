import React from 'react'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { Badge } from '@/components/ui/badge'
import { Media } from '@/components/Media'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { badge, heading, description, groups } = props

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-10">
          <div className="flex gap-4 flex-col">
            {badge && (
              <div>
                <Badge variant="outline">{badge}</Badge>
              </div>
            )}
            <div className="flex gap-2 flex-col">
              {heading && (
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
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

          {groups?.map((group, groupIndex) => (
            <div key={groupIndex} className={groupIndex > 0 ? 'mt-6' : ''}>
              <h3 className="mb-6 text-lg font-medium">{group.groupName}</h3>
              <div className="grid grid-cols-2 gap-4 border-t py-6 md:grid-cols-4">
                {group.members?.map((member, memberIndex) => (
                  <div key={memberIndex}>
                    <div className="bg-background size-20 rounded-full border p-0.5 shadow shadow-zinc-950/5 overflow-hidden">
                      {member.avatar && typeof member.avatar === 'object' ? (
                        <Media
                          resource={member.avatar as MediaType}
                          imgClassName="aspect-square rounded-full object-cover"
                        />
                      ) : (
                        <div className="aspect-square rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                          {member.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="mt-2 block text-sm">{member.name}</span>
                    {member.role && (
                      <span className="text-muted-foreground block text-xs">{member.role}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
