import Application from '../model/application'
import User from '../model/user'
import Availability from '../model/availability'

export const ApplicationService = {

  async getAllApplications (): Promise<any[]> {
    try {
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
    } catch (error) {
      console.error('Error fetching applications:', error)
      throw new Error('Fetching all applications failed')
    }
  }
}
