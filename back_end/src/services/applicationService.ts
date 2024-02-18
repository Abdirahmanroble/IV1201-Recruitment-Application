import { ApplicationAttributes } from "../model/application"; // Ensure correct path
import Application from "../model/application";
import Person from "../model/user";
import Availability from "../model/availability";

export const ApplicationService = {
  async createApplication(
    applicationData: ApplicationAttributes
  ): Promise<Application> {
    try {
      const application = await Application.create(applicationData as any);
      return application;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Creating application failed: ${error.message}`);
      } else {
        throw new Error("Creating application failed due to an unknown error");
      }
    }
  },

  async getAllApplications(): Promise<Application[]> {
    try {
      const applications = await Application.findAll({
        include: [
          {
            model: Person,
            attributes: ["name", "surname"],
          },
          {
            model: Availability,
            attributes: ["from_date", "to_date"],
          },
        ],
        attributes: [
          "application_id",
          "status",
          "openapplicationstatus",
          "applicationdate",
        ],
      });
      return applications;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Fetching all applications failed: ${error.message}`);
      } else {
        throw new Error(
          "Fetching all applications failed due to an unknown error"
        );
      }
    }
  },
};
