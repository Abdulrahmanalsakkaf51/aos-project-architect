import { z } from "zod";

const shortText = z.string().trim().min(1).max(300);
const detailText = z.string().trim().min(1).max(1_500);
const textList = z.array(shortText).min(1).max(10);

export const projectInputSchema = z
  .object({
    problem: z.string().trim().min(10).max(2_000),
    affected: z.string().trim().min(3).max(1_000),
    outcome: z.string().trim().min(5).max(1_000),
    constraints: z.string().trim().min(1).max(1_000),
  })
  .strict();

export const generatedProjectSchema = z
  .object({
    projectBrief: z.object({
      title: shortText,
      problemStatement: detailText,
      affectedPeople: detailText,
      desiredOutcome: detailText,
      successMeasures: textList,
      constraints: textList,
    }),
    partnerAssignments: z.object({
      atlas: z.object({ responsibility: detailText, tasks: textList }),
      librarian: z.object({ responsibility: detailText, tasks: textList }),
      guardian: z.object({ responsibility: detailText, tasks: textList }),
      humanCollaborator: z.object({
        responsibility: detailText,
        approvalsRequired: textList,
      }),
    }),
    actionPlan: z.object({
      workstreams: z
        .array(
          z.object({
            title: shortText,
            objective: detailText,
            tasks: textList,
            owner: z.enum(["Atlas", "The Librarian", "Guardian", "Human Collaborator"]),
            priority: z.enum(["Low", "Medium", "High"]),
          }),
        )
        .min(1)
        .max(8),
      milestones: z
        .array(
          z.object({ period: shortText, title: shortText, outcome: detailText }),
        )
        .min(1)
        .max(8),
    }),
    risksAndApprovals: z.object({
      risks: z
        .array(
          z.object({
            level: z.enum(["Low", "Medium", "High", "Critical"]),
            title: shortText,
            description: detailText,
            mitigation: detailText,
          }),
        )
        .min(1)
        .max(10),
      humanApprovals: textList,
      assumptions: textList,
    }),
    knowledgeCard: z.object({
      summary: detailText,
      lessons: textList,
      reusableKnowledge: textList,
      unansweredQuestions: textList,
      futureUse: detailText,
    }),
  })
  .strict();

export type ProjectInput = z.infer<typeof projectInputSchema>;
export type GeneratedProject = z.infer<typeof generatedProjectSchema>;
