import { parse } from "csv-parse"
import { createReadStream, writeFileSync } from 'fs'

const filePath = "./input/MNS_google_pdct_feed-KSA_EN.csv"

const filterOptions: string = "id=60624128023&item_group_id='T593114T'&gender='Women'"

const filterCondition = filterOptions.split('&').map(condition => `record.${condition}`).join('&').replaceAll('=', '==')
const parseCSV = parse({
    columns: header => header.map((column: string) => column),
    trim: true
});

(async () => {
    const parser = createReadStream(filePath).pipe(parseCSV)

    const records = []
    for await (const record of parser) {
        if(eval(filterCondition)) {
            records.push(record)
        }
    }
    writeFileSync('./output/result.json', JSON.stringify(records))
})()
