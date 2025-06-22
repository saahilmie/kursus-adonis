import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Peserta from '#models/peserta'
import { loginValidator, registerValidator } from '#validators/auth'

export default class AuthController {
  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.redirect().toRoute('dashboard')
    } catch {
      session.flash('error', 'Email atau password salah')
      return response.redirect().back()
    }
  }

  async showRegister({ view }: HttpContext) {
    return view.render('auth/register')
  }

  async register({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    try {
      // Buat user
      await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: 'user'
      })

      // Buat peserta
      await Peserta.create({
        nama: data.name,
        email: data.email
      })

      session.flash('success', 'Registrasi berhasil! Silakan login.')
      return response.redirect().toRoute('auth.login')
    } catch (error) {
      session.flash('error', 'Terjadi kesalahan saat registrasi')
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }
}
