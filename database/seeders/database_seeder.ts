import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'
import User from '#models/user'
import Instruktur from '#models/instruktur'
import Kursus from '#models/kursus'
import Peserta from '#models/peserta'
import PesertaKursus from '#models/peserta_kursus'

export default class extends BaseSeeder {
  async run() {
    // Buat admin user
    await User.create({
      name: 'Administrator',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin'
    })

    // Buat instruktur
    const instruktur1 = await Instruktur.create({
      nama: 'Dr. Ahmad Fauzi',
      email: 'ahmad.fauzi@instruktur.com'
    })

    const instruktur2 = await Instruktur.create({
      nama: 'Siti Nurhaliza, M.Kom',
      email: 'siti.nurhaliza@instruktur.com'
    })

    // Buat kursus
    const kursus1 = await Kursus.create({
      namaKursus: 'Web Development dengan Laravel',
      durasi: 40,
      instrukturId: instruktur1.id,
      biaya: 1500000
    })

    const kursus2 = await Kursus.create({
      namaKursus: 'Mobile App Development dengan Flutter',
      durasi: 35,
      instrukturId: instruktur2.id,
      biaya: 1800000
    })

    const kursus3 = await Kursus.create({
      namaKursus: 'Data Science dengan Python',
      durasi: 50,
      instrukturId: instruktur1.id,
      biaya: 2000000
    })

    // Buat peserta
    const peserta1 = await Peserta.create({
      nama: 'Budi Santoso',
      email: 'budi.santoso@email.com'
    })

    const peserta2 = await Peserta.create({
      nama: 'Ani Wijaya',
      email: 'ani.wijaya@email.com'
    })

    const peserta3 = await Peserta.create({
      nama: 'Rudi Tabuti',
      email: 'rudi.tabuti@email.com'
    })

    // Buat relasi peserta-kursus (pendaftaran)
    await PesertaKursus.create({
      pesertaId: peserta1.id,
      kursusId: kursus1.id,
      tanggalDaftar: DateTime.now(),
      status: 'aktif'
    })

    await PesertaKursus.create({
      pesertaId: peserta2.id,
      kursusId: kursus2.id,
      tanggalDaftar: DateTime.now(),
      status: 'aktif'
    })

    await PesertaKursus.create({
      pesertaId: peserta3.id,
      kursusId: kursus3.id,
      tanggalDaftar: DateTime.now(),
      status: 'aktif'
    })

    // Contoh: Peserta1 juga mengambil kursus Data Science
    await PesertaKursus.create({
      pesertaId: peserta1.id,
      kursusId: kursus3.id,
      tanggalDaftar: DateTime.now(),
      status: 'aktif'
    })
  }
}
