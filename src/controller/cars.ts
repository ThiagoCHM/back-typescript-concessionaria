import { Request, Response } from "express";
import { knex } from "../database/link";
import { Car } from "../types"

export const listarCarros = async (_: Request, res: Response) => {
    try {
        const cars = await knex('cars')
        return res.status(200).json(cars)
    } catch (error) {
        return res.status(500).json({ mensagem: "erro interno" })
    }
}

export const detalherCarros = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const car = await knex<Car>('cars')
            .where({ id: Number(id) }).first()

        if (!car) {
            return res.status(404).json({ mensagem: 'carro não encontrado' })
        }

        return res.json(car)
    } catch (error) {
        return res.status(500).json({ mensagem: "erro interno" })
    }
}

export const cadastrarCarros = async (req: Request, res: Response) => {
    const { marca, modelo, cor, ano, valor } = req.body

    try {
        const car = await knex<Omit<Car, 'id'>>('cars').insert({
            marca,
            modelo,
            cor,
            ano,
            valor
        }).returning('*')

        return res.status(201).json(car[0])
    } catch (error) {
        return res.status(500).json({ mensagem: "erro interno" })

    }
}

export const atualizarCarros = async (req: Request, res: Response) => {
    const { id } = req.params
    const { marca, modelo, cor, ano, valor } = req.body

    try {
        const car = await knex<Car>('cars')
            .where({ id: Number(id) })
            .first()

        if (!car) {
            return res.status(404).json({ mensagem: 'carro não encontrado' })
        }

        await knex<Car>('cars')
            .where({ id: Number(id) })
            .update({ marca, modelo, cor, ano, valor })

        return res.status(204).send()
    } catch (error) {
        return res.status(500).json({ mensagem: "erro interno" })
    }
}

export const excluirCarros = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const car = await knex<Car>('cars')
            .where({ id: Number(id) })
            .first()

        if (!car) {
            return res.status(404).json({ mensagem: 'carro não encontrado' })
        }

        await knex<Car>('cars')
            .where({ id: Number(id) })
            .del()

        return res.status(204).send()

    } catch (error) {
        return res.status(500).json({ mensagem: "erro interno" })

    }
}