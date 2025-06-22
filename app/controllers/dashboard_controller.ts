import type { HttpContext } from '@adonisjs/core/http'
import Kursus from '#models/kursus'
import Instruktur from '#models/instruktur'
import Pendaftaran from '#models/pendaftaran'
import Peserta from '#models/peserta'

export default class DashboardController {
  async index({ view, auth }: HttpContext) {
    const user = auth.user!

    if (user.role === 'admin') {
      const totalKursus = await Kursus.query().count('* as total')
      const totalInstruktur = await Instruktur.query().count('* as total')
      const totalPeserta = await Peserta.query().count('* as total')
      const totalPendaftaran = await Pendaftaran.query().count('* as total')

      return view.render('dashboard/admin', {
        stats: {
          kursus: totalKursus[0].$extras.total,
          instruktur: totalInstruktur[0].$extras.total,
          peserta: totalPeserta[0].$extras.total,
          pendaftaran: totalPendaftaran[0].$extras.total
        }
      })
    } else {
      const peserta = await Peserta.query().where('email', user.email).first()
      const myPendaftaran = await Pendaftaran.query()
        .where('peserta_id', peserta?.id || 0)
        .preload('kursus', (query) => {
          query.preload('instruktur')
        })
        .orderBy('created_at', 'desc')
        .limit(5)

      return view.render('dashboard/user', {
        pendaftarans: myPendaftaran
      })
    }
  }
}
