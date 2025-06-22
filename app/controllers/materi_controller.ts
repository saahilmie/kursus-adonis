import type { HttpContext } from '@adonisjs/core/http'
import Materi from '#models/materi'
import Kursus from '#models/kursus'
import { materiValidator } from '#validators/materi'
import app from '@adonisjs/core/services/app'

export default class MateriController {
  async index({ params, view }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.kursusId)
    const materis = await Materi.query()
      .where('kursus_id', params.kursusId)
      .orderBy('created_at', 'desc')

    return view.render('materi/index', { kursus, materis })
  }

  async create({ params, view }: HttpContext) {
    const kursus = await Kursus.findOrFail(params.kursusId)
    return view.render('materi/create', { kursus })
  }

  async store({ params, request, response, session }: HttpContext) {
    const data = await request.validateUsing(materiValidator)
    const file = request.file('file')

    let filePath = null
    if (file) {
      await file.move(app.makePath('uploads/materi'))
      filePath = file.fileName
    }

    await Materi.create({
      kursusId: params.kursusId,
      judul: data.judul,
      deskripsi: data.deskripsi,
      filePath: filePath
    })

    session.flash('success', 'Materi berhasil ditambahkan')
    return response.redirect().toRoute('materi.index', [params.kursusId])
  }

  async edit({ params, view }: HttpContext) {
    const materi = await Materi.query()
      .where('id', params.id)
      .preload('kursus')
      .firstOrFail()

    return view.render('materi/edit', { materi })
  }

  async update({ params, request, response, session }: HttpContext) {
  const materi = await Materi.findOrFail(params.id)
  const data = await request.validateUsing(materiValidator)
  const file = request.file('file')

  let updateData: any = {
    judul: data.judul,
    deskripsi: data.deskripsi
  }

  if (file) {
    await file.move(app.makePath('uploads/materi'))
    updateData.filePath = file.fileName
  }

    materi.merge(updateData)
    await materi.save()

    session.flash('success', 'Materi berhasil diupdate')
    return response.redirect().toRoute('materi.index', [materi.kursusId])
  }

  async destroy({ params, response, session }: HttpContext) {
    const materi = await Materi.findOrFail(params.id)
    const kursusId = materi.kursusId
    await materi.delete()

    session.flash('success', 'Materi berhasil dihapus')
    return response.redirect().toRoute('materi.index', [kursusId])
  }
}
