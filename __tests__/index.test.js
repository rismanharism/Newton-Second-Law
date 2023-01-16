/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/
const { execSync } = require('child_process')
const fs = require('fs')

const reconstructedFilename = 'reconstructed.js'

const resultan_gaya = (massa, percepatan) => {
  let solution = fs.readFileSync('./index.js', 'utf-8')

  solution = solution.replace(/(let|var) massa .*/, `$1 massa = ${massa}`)
  solution = solution.replace(/(let|var) percepatan .*/, `$1 percepatan = ${percepatan}`)

  fs.writeFileSync(reconstructedFilename, solution)

  return String(execSync(`node ${reconstructedFilename}`))
}

afterAll(() => {
  if (fs.existsSync(reconstructedFilename)) {
    fs.unlinkSync(reconstructedFilename)
  }
})
/*
========================================================================================================
ABAIKAN BLOCK CODE INI
========================================================================================================
*/

/*
========================================================================================================
PASTIKAN SOLUSI YANG DITULIS SESUAI DENGAN SKENARIO DIBAWAH INI
========================================================================================================
*/
describe('Newton Second Law', () => {
  it('Should produce the correct result ΣF = m x a (100)', () => {
    const result = resultan_gaya(10, 20)
    const result2 = resultan_gaya(10, -20)
    const result3 = resultan_gaya(17500, 1)
    const result4 = resultan_gaya(17500, 3)
    const result5 = resultan_gaya(0, 1)
    expect(result5).toMatch(/0/i)
    expect(result4).toMatch(/52500/i)
    expect(result3).toMatch(/17500/i)
    expect(result2).toMatch(/-200/i)
    expect(result).toMatch(/200/i)
  })
})
