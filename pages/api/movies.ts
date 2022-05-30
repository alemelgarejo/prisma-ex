// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Movie } from '../../interfaces/Movie'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Movie>
) {
  const data = JSON.parse(req.body)

  const createdMovie = await prisma.movie.create({
    data
  })

  res.json(createdMovie)
}
