import type { HttpContext } from '@adonisjs/core/http'
import Pendaftaran from '#models/pendaftaran'
import Peserta from '#models/peserta'

export default class PendaftaranController {
  async index({ view }: HttpContext) {
    const pendaftarans = await Pendaftaran.query()
      .preload('kursus', (query) => {
        query.preload('instruktur')
      })
      .preload('peserta')
      .orderBy('created_at', 'desc')

    return view.render('pendaftaran/index', { pendaftarans })
  }

  async myCourses({ view, auth }: HttpContext) {
    const user = auth.user!
    const peserta = await Peserta.query().where('email', user.email).first()

    if (!peserta) {
      return view.render('pendaftaran/my-courses', { pendaftarans: [] })
    }

    const pendaftarans = await Pendaftaran.query()
      .where('peserta_id', peserta.id)
      .preload('kursus', (query) => {
        query.preload('instruktur')
      })
      .orderBy('created_at', 'desc')

    return view.render('pendaftaran/my-courses', { pendaftarans })
  }

  async daftar({ params, response, session, auth }: HttpContext) {
    const user = auth.user!
    const peserta = await Peserta.query().where('email', user.email).first()

    if (!peserta) {
      session.flash('error', 'Data peserta tidak ditemukan')
      return response.redirect().back()
    }

    // Cek apakah sudah terdaftar
    const existing = await Pendaftaran.query()
      .where('kursus_id', params.id)
      .where('peserta_id', peserta.id)
      .first()

    if (existing) {
      session.flash('error', 'Anda sudah terdaftar di kursus ini')
      return response.redirect().back()
    }

    await Pendaftaran.create({
      kursusId: params.id,
      pesertaId: peserta.id,
      status: 'pending'
    })

    session.flash('success', 'Pendaftaran berhasil! Menunggu persetujuan admin.')
    return response.redirect().toRoute('my.courses')
  }

  async approve({ params, response, session }: HttpContext) {
    const pendaftaran = await Pendaftaran.findOrFail(params.id)
    pendaftaran.status = 'approved'
    await pendaftaran.save()

    session.flash('success', 'Pendaftaran berhasil disetujui')
    return response.redirect().back()
  }

  async reject({ params, response, session }: HttpContext) {
    const pendaftaran = await Pendaftaran.findOrFail(params.id)
    pendaftaran.status = 'rejected'
    await pendaftaran.save()

    session.flash('success', 'Pendaftaran ditolak')
    return response.redirect().back()
  }

  async destroy({ params, response, session }: HttpContext) {
    const pendaftaran = await Pendaftaran.findOrFail(params.id)
    await pendaftaran.delete()

    session.flash('success', 'Pendaftaran berhasil dihapus')
    return response.redirect().back()
  }
}
