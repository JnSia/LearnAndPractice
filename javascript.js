async function order() {
    try {
        const result1 = await f1()
        const result2 = await f2(result1)
        const result3 = await f3(result2)
        console.log(result3)
    } catch {
        console.log(error)
    }

    console.log("종료")
}