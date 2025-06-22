import type { HttpContext } from '@adonisjs/core/http'
import Kursus from '#models/kursus'

export default class HomeController {
  async index({ view }: HttpContext) {
    // Ambil 6 kursus terbaru untuk ditampilkan di homepage
    const featuredKursuses = await Kursus.query()
      .preload('instruktur')
      .orderBy('createdAt', 'desc')
      .limit(6)

    return view.render('home', { featuredKursuses })
  }
}
