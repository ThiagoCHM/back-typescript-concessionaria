import link from 'knex'

export const knex = link({
    client: 'pg',
    connection: {
        host: 'aws-0-sa-east-1.pooler.supabase.com',
        port: 5432,
        user: 'postgres.gnndtxkceyczkzxsoura',
        password: 'XbK8712!)(çç',
        database: 'postgres'
    }
})