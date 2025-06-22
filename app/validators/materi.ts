import vine from '@vinejs/vine'

export const materiValidator = vine.compile(
  vine.object({
    judul: vine.string().minLength(2).maxLength(200),
    deskripsi: vine.string().minLength(10),
    file: vine.file({
      size: '10mb',
      extnames: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4', 'avi', 'mov']
    }).optional()
  })
)
