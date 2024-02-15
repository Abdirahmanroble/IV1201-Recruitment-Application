import { type Request, type Response } from 'express'
import Person from '../model/user'
/**
 This is just test
 *
 */
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const name = req.method === 'POST' ? req.body.name : req.query.name

    const user = await Person.findAll({
      where: {
        name
      }
    })

    if (user) {
      res.json(user)

      console.log(user)
    } else {
      res.status(404).send('User not found')
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).send('Internal Server Error')
  }
}
