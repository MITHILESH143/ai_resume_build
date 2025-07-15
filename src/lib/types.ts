import { ResumeValues } from "./validation";
import { Prisma } from "/app/generated/prisma-client";

export interface EditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export interface ResumeSectionProps {
  resumeData: ResumeValues;
}

export const resumeDataInclude = {
  workExperiences: true,
  educations: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof resumeDataInclude;
}>;

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_subscription_id: string;
  razorpay_signature: string;
}

export interface RazorpayOptions {
  key: string;
  subscription_id: string;
  name: string;
  description: string;
  handler: (response: RazorpayResponse) => void;
  modal: {
    ondismiss: () => void;
  };
  theme: {
    color: string;
  };
}

export interface RazorpayInstance {
  open: () => void;
}

export interface SubscriptionData {
  plan_id: string;
  total_count: number;
  quantity: number;
  expire_by: number;
  customer_notify: boolean;
  notes: object;
  customer_id: string | undefined;
}

export interface RazorpayWebHookPayload {
  subscription: {
    entity: {
      id: string;
      entity: "subscription";
      plan_id: string;
      customer_id: string;
      status:
        | "created"
        | "authenticated"
        | "active"
        | "pending"
        | "halted"
        | "completed"
        | "cancelled";
      current_start: number | null;
      current_end: number | null;
      ended_at: number | null;
      quantity: number;
      notes: Record<string, string>;
      charge_at: number | null;
      start_at: number | null;
      end_at: number | null;
      auth_attempts: number;
      total_count: number;
      paid_count: number;
      customer_notify: boolean;
      created_at: number;
      expire_by: number | null;
      short_url: string | null;
      has_scheduled_changes: boolean;
      change_scheduled_at: number | null;
      source: string;
      offer_id?: string;
      remaining_count: number;
    };
  };
}
