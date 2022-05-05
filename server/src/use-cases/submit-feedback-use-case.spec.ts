import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"
import { Feedback } from "@prisma/client";

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
   { create: createFeedbackSpy },
   { sendMail: sendMailSpy }
)

describe('Submit Feedback', () => {
   it('should be able to submit feedback', async () => {

      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: 'Example Comment',
         screenshot: 'data:image/png;base64,iVBORw0KGgoAAA'
      })).resolves.not.toThrow()

      expect(createFeedbackSpy).toHaveBeenCalled();
      expect(createFeedbackSpy).toHaveBeenCalled();
   })

   it('should not be able to submit feedback without type', async () => {

      await expect(submitFeedback.execute({
         type: '',
         comment: 'Example Comment',
         screenshot: 'data:image/png;base64,iVBORw0KGgoAAA'
      })).rejects.toThrow()
   })

   it('should not be able to submit feedback without comment', async () => {

      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: '',
         screenshot: 'data:image/png;base64,iVBORw0KGgoAAA'
      })).rejects.toThrow()
   })

   it('should not be able to submit feedback with invalid screenshot', async () => {

      await expect(submitFeedback.execute({
         type: 'BUG',
         comment: 'Example Comment',
         screenshot: 'foto.png'
      })).rejects.toThrow()
   })



})