import type { HttpContext } from '@adonisjs/core/http'
import Kursus from '#models/kursus'

export default class ReportController {
  async pesertaPerKursus({ view }: HttpContext) {
    const kursuses = await Kursus.query()
      .preload('instruktur')
      .preload('pendaftarans', (query) => {
        query.where('status', 'approved').preload('peserta')
      })
      .orderBy('nama_kursus')

    return view.render('reports/peserta-per-kursus', { kursuses })
  }
}
