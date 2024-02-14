/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Represents a competence profile with a specific number of years of experience.
 * This class is designed to encapsulate the competence level of an individual in terms of their years of experience in a particular domain.
 */
class CompetenceProfile {
  /**
   * Holds the number of years of experience the individual has.
   * This private property is used internally to represent the level of experience.
   * @private
   * @type {number}
   */
  private readonly yearsOfExperience: number
  /**
   * Constructs a new instance of CompetenceProfile with a given number of years of experience.
   * @param {number} yearsOfExperience - The number of years of experience in the individual's competence profile.
   */
  constructor (yearsOfExperience: number) {
    this.yearsOfExperience = yearsOfExperience
  }
}
