/**
 * alumni controller
 */

import { factories } from '@strapi/strapi'

function getEnumerationValues(
  attribute: { type?: string; enum?: string[] } | undefined
): string[] {
  if (!attribute || attribute.type !== 'enumeration' || !Array.isArray(attribute.enum)) {
    return []
  }
  return attribute.enum
}

export default factories.createCoreController('api::alumni.alumni', ({ strapi }) => ({
  async formOptions(ctx) {
    const model = strapi.contentTypes['api::alumni.alumni']
    const attributes = model.attributes as Record<
      string,
      { type?: string; enum?: string[] }
    >

    ctx.body = {
      data: {
        courseCode: getEnumerationValues(attributes.courseCode),
        major: getEnumerationValues(attributes.major),
        faculty: getEnumerationValues(attributes.faculty),
      },
    }
  },
}))
