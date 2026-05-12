import React from 'react'

import type { TeamBlock as TeamBlockProps } from '@/payload-types'
import type { Media as MediaType } from '@/payload-types'

import { Media } from '@/components/Media'

export const TeamBlock: React.FC<TeamBlockProps> = (props) => {
  const { groups } = props

  return (
    <section className="py-12 md:py-32">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h2 className="mb-8 text-4xl font-bold md:mb-16 lg:text-5xl">Our team</h2>

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
    </section>
  )
}
