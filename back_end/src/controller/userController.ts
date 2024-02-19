import { Request, Response } from 'express';
import { ApplicationService } from '../services/applicationService';

export const UserController = {
  async getUserApplications(req: Request, res: Response): Promise<void> {
    try {
      const applications = await ApplicationService.getAllApplications();
      res.json(applications);
    } catch (error: unknown) { 
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('An unknown error occurred');
      }
    }
  }
};
