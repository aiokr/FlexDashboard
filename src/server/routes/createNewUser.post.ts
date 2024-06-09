import prisma from "./prisma"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  //console.log(body)

  const addUser = await prisma.user.create({
    data: {
      uid: body.user.id,
      email: body.user.email,
      name: body.user.user_metadata.name.toString(),
      role: 'USER',
    },
  })

  console.log(addUser)
  return { addUser }
})