import React, { Fragment } from "react";

import type { Page } from "@/payload-types";

import { AdmissionsMapBlock } from "@/blocks/AdmissionsMap/Component";
import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { BentoBlock } from "@/blocks/Bento/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { CaseStudiesBlock } from "@/blocks/CaseStudies/Component";
import { ContactInfoBlock } from "@/blocks/ContactInfo/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FAQBlock } from "@/blocks/FAQBlock/Component";
import { FeatureSplitBlock } from "@/blocks/FeatureSplit/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { GiveBackCycleBlock } from "@/blocks/GiveBackCycle/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { ParagraphBlock } from "@/blocks/Paragraph/Component";
import { PipelineStepsBlock } from "@/blocks/PipelineSteps/Component";
import { ScholarDirectoryBlock } from "@/blocks/ScholarDirectory/Component";
import { ScrollItemsBlock } from "@/blocks/ScrollItems/Component";
import { StatsBlock } from "@/blocks/StatsBlock/Component";
import { TeamBlock } from "@/blocks/TeamBlock/Component";
import { TestimonialsBlock } from "@/blocks/Testimonials/Component";
import { VerificationBlock } from "@/blocks/Verification/Component";

const blockComponents = {
  admissionsMap: AdmissionsMapBlock,
  archive: ArchiveBlock,
  bento: BentoBlock,
  caseStudies: CaseStudiesBlock,
  contactBlock: ContactInfoBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  faqBlock: FAQBlock,
  featureSplit: FeatureSplitBlock,
  formBlock: FormBlock,
  giveBackCycle: GiveBackCycleBlock,
  mediaBlock: MediaBlock,
  paragraph: ParagraphBlock,
  pipelineSteps: PipelineStepsBlock,
  scholarDirectory: ScholarDirectoryBlock,
  scrollItems: ScrollItemsBlock,
  statsBlock: StatsBlock,
  teamBlock: TeamBlock,
  testimonials: TestimonialsBlock,
  verification: VerificationBlock,
};

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              return (
                /*
                 * Blocks own their vertical rhythm (py-20 lg:py-28) so the section
                 * cadence comes from the design system rather than a wrapper margin
                 * stacked on top of block padding.
                 */
                <div key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
