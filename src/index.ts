import { parse } from "csv-parse"
import { createReadStream, writeFileSync } from 'fs'

const filePath = "./input/MNS_google_pdct_feed-KSA_EN.csv"

const filterOptions: string[] = ['id', 'title', 'link', 'price', 'color'];

const parseCSV = parse({
    columns: header => header.map((column: string) => {
        if(filterOptions.includes(column)) return column
    }),
    trim: true
});

(async () => {
    const parser = createReadStream(filePath).pipe(parseCSV)

    const records = []

    for await (const record of parser) {
        records.push(record)
    }

    writeFileSync('./output/result.json', JSON.stringify(records))
})()
