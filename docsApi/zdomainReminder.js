/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Bearer
 *  schemas:
 *      TagihanTemplateDomain:
 *          type: object
 *          example:
 *              status_code: 200
 *              data:
 *                  id: 2314214
 *                  jenis_remainder: domain
 *                  nama_remainder: nama_reminder
 *                  tagihan: 15000  
 *                  tgl_tagihan_telah_lunas: 28-02-2022
 *                  tgl_jatuh_tempo: 02-03-2022
 *                  status: Lunas/Belum Bayar/Telat Bayar/Jatuh Tempo
 *                  updatedAt: 2021-12-31T04:26:52.955Z
 *                  createdAt: 2021-12-31T04:26:52.955Z
 *      TemplateCreateDomain:
 *          type: object
 *          required:
 *              - jenis_remainder
 *              - nama_remainder
 *              - tgl_jatuh_tempo
 *          properties:
 *              id:
 *                  type: integer
 *              jenis_remainder:
 *                  type: string    
 *              nama_remainder: 
 *                  type: string
 *              tagihan:
 *                  type: string
 *              tgl_tagihan_telah_lunas:
 *                  type: string
 *              tgl_jatuh_tempo:
 *                  type: string
 *              status:
 *                  type: string
 *              createdAt:
 *                  type: timestamp     
 *              updatedAt:
 *                  type: timestamp
 *          example:
 *                  jenis_remainder: domain
 *                  nama_remainder: nama_reminder
 *                  tagihan: 15000  
 *                  tgl_tagihan_telah_lunas: 28-02-2022
 *                  tgl_jatuh_tempo: 02-03-2022
 *                  status: Lunas/Belum Bayar/Telat Bayar/Jatuh Tempo
 *              
 */

/**
 * @swagger
 * tags:
 *  name: Reminder Domain
 *  description: Reminder for Domain
 * 
 * /domain:
 *  get:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Get All Data
 *      tags: [ Reminder Domain ]
 *      responses:
 *          200:
 *              description: All Data Domain
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagihanTemplateDomain'
 *
 * /domain/createReminder:
 *  post:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Add Data Reminder Domain
 *      tags: [Reminder Domain]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TemplateCreateDomain'
 *      responses:
 *          201:
 *              description: Success Create Data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagihanTemplateDomain'
 *                          
 * /domain/edit/{id}:
 *  put:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Edit Data Domain
 *      tags: [ Reminder Domain ]    
 *      parameters:
 *            - in : path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: ID Reminder Domain
 *      requestBody:
 *              requred: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/TemplateCreateDomain'
 *      responses:
 *          200:
 *              description: Success Edited Data
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagihanTemplateDomain'
 * 
 * /domain/editBayar/{id}:
 *  put:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Edit Pembayaran Baru
 *      tags: [ Reminder Domain  ]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: string
 *          required: true
 *          description: ID Reminder For edit pembayaran baru
 *      responses:
 *          200:
 *              description: Tagihan telah di bayar
 * /domain/delete/{id}:
 *  delete:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Delete for this data
 *      tags: [ Reminder Domain ]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: ID Reminder Domain for delete this data
 * 
 *      responses:
 *          200:
 *              description: This data reminder domain was deleted
 *          
 */