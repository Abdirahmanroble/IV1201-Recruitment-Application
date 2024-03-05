import Application from '../model/application'
import User from '../model/user'
import Availability from '../model/availability'
import db from '../integration/dbConfig'

/**
 * `ApplicationService` is an object that encapsulates business logic related to application entities.
 * Currently, it provides a method to fetch all applications from the database,
 * including related user and availability information.
 */
export const ApplicationService = {
  /**
   * Asynchronously retrieves all applications from the database, including the related
   * user and availability data. This method uses a database transaction to ensure
   * consistency and isolation of the read operation.
   *
   * Each application's data is augmented with the user's full name (combining name and surname)
   * and the date range of availability. The method formats this data into a more consumable
   * structure for the calling context.
   *
   * @returns {Promise<any[]>} A promise that resolves to an array of application objects,
   * each including application ID, user's full name, application status, application date,
   * and availability date range. If the operation fails, it throws an error with a descriptive message.
   * @throws {Error} If fetching applications from the database fails.
   */
  async getAllApplications (): Promise<any[]> {
    try {
      return await db.transaction(async () => {
        const applications = await Application.findAll({
          include: [
            {
              model: User,
              attributes: ['name', 'surname']
            },
            {
              model: Availability,
              attributes: ['from_date', 'to_date']
            }
          ],
          attributes: [
            'application_id',
            'status',
            'openapplicationstatus',
            'applicationdate'
          ],
          order: [
            ['applicationdate', 'DESC']
          ]
        })

        return applications.map((application) => {
          const user = application.get('User') as User
          const availability = application.get('Availability') as Availability

          return {
            application_id: application.application_id,
            fullName: `${user?.name} ${user?.surname}`,
            status: application.status,
            applicationDate: application.applicationdate,
            fromDate: availability?.from_date,
            toDate: availability?.to_date
          }
        })
      })
    } catch (error) {
      console.error('Error fetching applications:', error)
      throw new Error('Fetching all applications failed')
    }
  }
}
