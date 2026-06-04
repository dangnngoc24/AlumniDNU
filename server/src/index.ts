import fs from 'fs'
import path from 'path'

export default {
  register() {},

  bootstrap() {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    fs.mkdirSync(uploadDir, { recursive: true })
  },
}
