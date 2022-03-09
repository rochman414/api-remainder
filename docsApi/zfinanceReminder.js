/**
 * @swagger
 * components:
 *  securitySchemes:
 *      ApiKeyAuth:
 *          type: apiKey
 *          in: header
 *          name: Bearer
 *  schemas:
 *      TagihanTemplateFinance:
 *          type: object
 *          example:
 *              status_code: 200
 *              data:
 *                  id: 2314214
 *                  jenis_remainder: finance
 *                  nama_remainder: nama_reminder
 *                  tagihan: 15000  
 *                  tgl_tagihan_telah_lunas: 28-02-2022
 *                  tgl_jatuh_tempo: 02-03-2022
 *                  status: Lunas/Belum Bayar/Telat Bayar/Jatuh Tempo
 *                  updatedAt: 2021-12-31T04:26:52.955Z
 *                  createdAt: 2021-12-31T04:26:52.955Z
 *      TemplateCreateFinance:
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
 *                  jenis_remainder: finance
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
 *  name: Reminder Finance
 *  description: Reminder for finance
 * 
 * /finance:
 *  get:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Get All Data
 *      tags: [ Reminder Finance ]
 *      responses:
 *          200:
 *              description: All Data Finance
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagihanTemplateFinance'
 *
 * /finance/createReminder:
 *  post:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Add Data Reminder Finance
 *      tags: [Reminder Finance]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/TemplateCreateFinance'
 *      responses:
 *          201:
 *              description: Success Create Data
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagihanTemplateFinance'
 *                          
 * /finance/edit/{id}:
 *  put:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Edit Data Finance
 *      tags: [ Reminder Finance ]    
 *      parameters:
 *            - in : path
 *              name: id
 *              schema:
 *                  type: string
 *              required: true
 *              description: ID Reminder Finance
 *      requestBody:
 *              requred: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref:   '#/components/schemas/TemplateCreateFinance'
 *      responses:
 *          200:
 *              description: Success Edited Data
 *              content:
 *                  apllication/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TagihanTemplateFinance'
 * 
 * /finance/editBayar/{id}:
 *  put:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Edit Pembayaran Baru
 *      tags: [ Reminder Finance  ]
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
 * /finance/delete/{id}:
 *  delete:
 *      security:
 *          - ApiKeyAuth: []
 *      summary: Delete for this data
 *      tags: [ Reminder Finance ]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema: 
 *              type: string
 *          required: true
 *          description: ID Reminder Finance for delete this data
 * 
 *      responses:
 *          200:
 *              description: This data reminder fianance was deleted
 *          
 */