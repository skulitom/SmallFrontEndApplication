import React, {useEffect, useState} from 'react';
import {IProps} from '../utils/UserDataInterface';
import {Bar} from 'react-chartjs-2';
import {Button} from '@material-ui/core';
import {getAverageArray, calculateAge} from '../utils/ChartTools'

const ChartsPage = (props: IProps) => {
    const [chartState, setChartState] = useState({
        labels: [] as any[],
        datasets: [{
            label: 'Default',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [] as number[]
        }]
    });

    const [chartChosen, setChartChosen] = useState(0 as number);
    const [industryLabels, setIndustryLabels] = useState([] as any[]);
    const [experienceLabels, setExperienceLabels] = useState([] as any[]);
    const [averageAgePerIndustry, setAverageAgePerIndustry] = useState([] as number[]);
    const [averageSalaryPerIndustry, setAverageSalaryPerIndustry] = useState([] as number[]);
    const [averageExperiencePerIndustry, setAverageExperiencePerIndustry] = useState([] as number[]);
    const [averageSalaryPerYearExperience, setAverageSalaryPerYearExperience] = useState([] as number[]);

    const changeChart = (title: string, labels: any[], data: number[], color: string) => {
        setChartState({
            labels: labels,
            datasets: [{
                label: title,
                backgroundColor: color,
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: data
            }]
        })
    }

    useEffect(() => {
        // select chart based on button clicked
        switch (chartChosen) {
            case 0:
                changeChart('Average Age per Industry', industryLabels, averageAgePerIndustry, 'rgba(75,192,192,1)');
                break;
            case 1:
                changeChart('Average Salary per Industry', industryLabels, averageSalaryPerIndustry, 'rgba(192,75,192,1)');
                break;
            case 2:
                changeChart('Average Years of Experience per Industry', industryLabels, averageExperiencePerIndustry, 'rgba(192,192,75,1)');
                break;
            case 3:
                changeChart('Average Years of Experience per Industry', experienceLabels, averageSalaryPerYearExperience, 'rgba(192,75,75,1)');
                break;
            default:
                changeChart('Average Age per Industry', industryLabels, averageAgePerIndustry, 'rgba(75,192,192,1)');
        }
    }, [chartChosen,
        averageAgePerIndustry,
        averageExperiencePerIndustry,
        averageSalaryPerIndustry,
        averageSalaryPerYearExperience,
        experienceLabels,
        industryLabels
    ]);

    // get the average amount array for 2 values X per Y
    // process data was required for age calculation, a way to filter data in label X
    const getAverageXPerItemY = (propsData: any, labels: any, lebelX: string, labelY: string, processData: Function) => {
        let totalArray: number[] = new Array(labels.length).fill(0);
        let countArray: number[] = new Array(labels.length).fill(0);
        for (const data of propsData) {
            if (data[labelY]) {
                if (labels.includes(data[labelY])) {
                    let index = labels.indexOf(data[labelY]);
                    if (data[lebelX]) {
                        countArray[index] += 1;
                        totalArray[index] += processData(data[lebelX]);
                    }
                }
            }
        }
        return getAverageArray(totalArray, countArray);

    }

    useEffect(() => {
        if (props.data) {
            let labelsSet = new Set();
            let experienceSet = new Set();

            // Filter for valid unique labels
            for (const data of props.data) {
                if (data['industry'] != null && data['industry'] !== 'n/a') {
                    labelsSet.add(data['industry']);
                }
                if (data['years_of_experience'] != null) {
                    experienceSet.add(Math.round(data['years_of_experience']));
                }
            }
            const labelsList = Array.from(labelsSet);
            const experienceList = Array.from(experienceSet).sort();

            setIndustryLabels(labelsList);
            setExperienceLabels(experienceList);
            setAverageAgePerIndustry(getAverageXPerItemY(props.data, labelsList, 'date_of_birth', 'industry', (item: string) => {return calculateAge(item)}));
            setAverageSalaryPerIndustry(getAverageXPerItemY(props.data, labelsList, 'salary', 'industry', (item: any) => {return item}));
            setAverageExperiencePerIndustry(getAverageXPerItemY(props.data, labelsList, 'years_of_experience', 'industry', (item: any) => {return item}));
            setAverageSalaryPerYearExperience(getAverageXPerItemY(props.data, experienceList, 'salary', 'years_of_experience', (item: any) => {return item}));
        }
    }, [props]);

    return < div>
        <div id="chartMenu">
            <Button variant="outlined" color="primary" onClick={() => setChartChosen(0)}>
                Age Per Industry
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setChartChosen(1)}>
                Salary Per Industry
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setChartChosen(2)}>
                Experience Per Industry
            </Button>
            <Button variant="outlined" color="primary" onClick={() => setChartChosen(3)}>
                Salary Per Year Experience
            </Button>
        </div>
        <Bar
            data={chartState}
            options={{
                title: {
                    display: true,
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }}
        />
    </div>
};

export default ChartsPage;