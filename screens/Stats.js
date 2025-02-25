import {View, StyleSheet, Text, Dimensions, ScrollView} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { URL } from '../config/config';
import NewList from '../components/new_list';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';

export default function Stats(){
    const month = "02";
    const year = "2025";
    const [chartData, setChartData] = useState([]);
    const [array, setArray] = useState([]);
    
    const getActivities = async (date) => {
        try{
            const response = await fetch(`${URL}/elementsDone/${date}`);
            const data = await response.json();
                    
            if(response.ok){
                console.log(`Elementos extraidos exitosamente fecha: ${date}`, data);
                console.log(data.count);
                return data.count;
            }else{
                console.error('Error al crear la lista:', data.message);
                alert(data.message);
            }
                
        }catch(error){
            console.error(error.message);
            alert('Error obteniendo los elementos.');
        }
    }
    

    useEffect(() => {
        /*const asignarArray = async () => {
            let newArray = []; // Array temporal para evitar problemas con `setState`
        
            for (let i = 0; i < 28; i++) {
                const formattedDate = new Date(year, month - 1, i + 1).toISOString().split('T')[0];
                console.log("Fecha consultada:", formattedDate); // Verifica que la fecha cambia en cada iteración
                
                try {
                    const count = await getActivities(formattedDate);
                    newArray.push(count); // Agregar el resultado al array temporal
                } catch (error) {
                    console.error(`Error obteniendo datos para ${formattedDate}:`, error);
                    newArray.push(0); // En caso de error, agregar un valor por defecto
                }
            }

            setArray(newArray); // Actualizar el estado solo una vez al final del bucle
        }

        asignarArray();*/
        const fetchData = async () => {
            let newArray = []; // Array temporal para evitar problemas con `setState`
        
            for (let i = 0; i < 28; i++) {
                const formattedDate = new Date(year, month - 1, i + 1).toISOString().split('T')[0];
                console.log("Fecha consultada:", formattedDate); // Verifica que la fecha cambia en cada iteración
                
                try {
                    const count = await getActivities(formattedDate);
                    newArray.push(count); // Agregar el resultado al array temporal
                } catch (error) {
                    console.error(`Error obteniendo datos para ${formattedDate}:`, error);
                    newArray.push(0); // En caso de error, agregar un valor por defecto
                }
            }

            setChartData(newArray); // Actualizar el estado solo una vez al final del bucle
            /*const newData = await Promise.all(
                Array.from({ length: 28 }, async (_, i) => {
                    const formattedDate = new Date(year, month - 1, i + 1).toISOString().split('T')[0];
                    const count = await getActivities(formattedDate);
                    return Number.isFinite(count) ? count : 0; // Validar que sea un número
                })
            );
            setChartData(newData);*/
        };

        fetchData();
    }, []);


    const xkey = Array.from({ length: 28 }, (_, i) => i + 1);

    // Generar valores aleatorios para el dataset (uno por cada día del mes)
    const ykey = xkey.map(() => Math.random() * 100);
    
    if (chartData.length < 27) {
        return <Text>Loading...</Text>; // Mostrar un mensaje mientras los datos están siendo cargados
    }

    const data = {
        labels: xkey,
        datasets: [{ data: chartData }],
    }

    const getYAxisInterval = (data) => {
        const maxValue = Math.max(...data); // Obtén el valor máximo de tus datos
        const minValue = Math.min(...data); // Obtén el valor mínimo de tus datos
        return (maxValue - minValue) <= 1 ? 1 : Math.floor((maxValue - minValue) / 2); // Ajusta el intervalo
    }
    
    const yAxisInterval = getYAxisInterval(chartData);

    return(
        <View style={styles.container}>
            <View style={styles.monthStatistics}>
                <Text style={styles.title}>FEBRERO</Text>
                <Text style={styles.title}>TAREAS REALIZADAS</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={data}
                        width={Dimensions.get("window").width * 2} // from react-native
                        height={220}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            fromZero: true,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "3",
                                stroke: "#ffa726"
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </ScrollView>
            </View>
        </View>
    );
}

styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },

    monthStatistics:{
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f2f2f2',
        borderRadius: 20,
    },

    title:{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
})