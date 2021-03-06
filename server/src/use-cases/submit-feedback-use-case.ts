import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackCaseRequest {
   type: string;
   comment: string;
   screenshot?: string;
}

export class SubmitFeedbackUseCase {

   constructor(
      private feedbacksRepository: FeedbackRepository,
      private mailAdapter: MailAdapter
   ) { }

   async execute(request: SubmitFeedbackCaseRequest) {
      const { type, comment, screenshot } = request;

      if (!type) {
         throw new Error('Type is required')
      }

      if (!comment) {
         throw new Error('Comment is required')
      }

      if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
         throw new Error('Invalid screenshot format')
      }

      const feedback = await this.feedbacksRepository.create({
         type,
         comment,
         screenshot
      })

      await this.mailAdapter.sendMail({
         subject: 'Novo Feedback',
         body: [
            `<h1> Novo Feedback Recebido</h1>`,
            `<div style="font-family: sans-serif; font-size:16px"`,
            `<p>Tipo do Feedback: ${type} </p>`,
            `<p>Comentário: ${comment} </p>`,
            screenshot ? `<p>Screenshot:</p><img src="${screenshot}" />` : null,
            `</div>`
         ].join('\n')

      })

      return feedback
   }
}