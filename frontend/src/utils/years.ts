export const getYears = (start: number, end: number) => {
    const years: number[] = [];
    for (let year: number = start; year < end; year++) {
        years.push(year);
    }
    return years;
}
