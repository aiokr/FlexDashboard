import prisma from "../routes/prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const user = await prisma.user.findUnique({
    where: {
      uid: body.user.id,
    },
  })

  return { role: user.role }
})