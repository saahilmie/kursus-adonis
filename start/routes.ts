import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

// Auth Routes
router.get('/login', 'AuthController.showLogin').as('auth.login')
router.post('/login', 'AuthController.login')
router.get('/register', 'AuthController.showRegister').as('auth.register')
router.post('/register', 'AuthController.register')
router.post('/logout', 'AuthController.logout').as('auth.logout').use(middleware.auth())

// Public Routes
router.get('/', '#controllers/home_controller.index').as('home')
router.get('/kursus', 'KursusController.publicIndex').as('kursus.public')
router.get('/kursus/:id', 'KursusController.show').as('kursus.show')

// Protected Routes
router.group(() => {
  router.get('/dashboard', 'DashboardController.index').as('dashboard')

  // User Routes
  router.group(() => {
    router.get('/my-courses', 'PendaftaranController.myCourses').as('my.courses')
    router.post('/daftar-kursus/:id', 'PendaftaranController.daftar').as('daftar.kursus')
  }).middleware(middleware.role({ roles: ['user'] }))

  // Admin Routes
  router.group(() => {
    // Instruktur CRUD
    router.resource('instruktur', 'InstrukturController')

    // Kursus CRUD - Admin only routes
    router.get('/admin/kursus', 'KursusController.index').as('kursus.index')
    router.get('/admin/kursus/create', 'KursusController.create').as('kursus.create')
    router.post('/admin/kursus', 'KursusController.store').as('kursus.store')
    router.get('/admin/kursus/:id/edit', 'KursusController.edit').as('kursus.edit')
    router.patch('/admin/kursus/:id', 'KursusController.update').as('kursus.update')
    router.delete('/admin/kursus/:id', 'KursusController.destroy').as('kursus.destroy')

    // Pendaftaran Management
    router.get('/pendaftaran', 'PendaftaranController.index').as('pendaftaran.index')
    router.patch('/pendaftaran/:id/approve', 'PendaftaranController.approve').as('pendaftaran.approve')
    router.patch('/pendaftaran/:id/reject', 'PendaftaranController.reject').as('pendaftaran.reject')
    router.delete('/pendaftaran/:id', 'PendaftaranController.destroy').as('pendaftaran.destroy')

    // Materi CRUD
    router.get('/kursus/:kursusId/materi', 'MateriController.index').as('materi.index')
    router.get('/kursus/:kursusId/materi/create', 'MateriController.create').as('materi.create')
    router.post('/kursus/:kursusId/materi', 'MateriController.store').as('materi.store')
    router.get('/materi/:id/edit', 'MateriController.edit').as('materi.edit')
    router.patch('/materi/:id', 'MateriController.update').as('materi.update')
    router.delete('/materi/:id', 'MateriController.destroy').as('materi.destroy')

    // Peserta Management
    router.resource('peserta', 'PesertaController')

    // Reports
    router.get('/reports/peserta-per-kursus', 'ReportController.pesertaPerKursus').as('reports.peserta')
  }).middleware(middleware.role({ roles: ['admin'] }))

}).use(middleware.auth())
