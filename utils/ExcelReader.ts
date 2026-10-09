import * as XLSX from "xlsx";
export class ExcelReader 
{
    private static workbook = XLSX.readFile("./test-data/TestData.xlsx");
    static getData(sheetName: string): any[] 
    {
        const sheet = this.workbook.Sheets[sheetName];
        if (!sheet) 
        {
            throw new Error(`Sheet '${sheetName}' not found in TestData.xlsx`);
        }
        return XLSX.utils.sheet_to_json(sheet);
    }
}