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

            setChartData(newArray);
        };

        fetchData();
    }, []);


    const xkey = Array.from({ length: 28 }, (_, i) => i + 1);

    // Generar valores aleatorios para el dataset (uno por cada día del mes)
    const ykey = xkey.map(() => Math.random() * 100);
    
    if (chartData.length < 27) {
        return (
            <View style={styles.container}>
                <Text>Cargando...</Text>
            </View>
        ); // Mostrar un mensaje mientras los datos están siendo cargados
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
                <Text style={styles.title}>TAREAS REALIZADAS</Text>
            </View>
                <Text style={styles.month}>FEBRERO</Text>
                <ScrollView style={styles.graphContainer} horizontal showsHorizontalScrollIndicator={false}>
                    <LineChart
                        data={data}
                        width={Dimensions.get("window").width * 2} // from react-native
                        height={220}
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#b45eff",
                            backgroundGradientFrom: "#8469ff",
                            backgroundGradientTo: "#4cacfd",
                            decimalPlaces: 0, // optional, defaults to 2dp
                            fromZero: true,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "4",
                                strokeWidth: "1",
                                stroke: "#fff"
                            },
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </ScrollView>
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
        marginBottom: 20,
        padding: 5,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomStartRadius: 50,
        borderBottomEndRadius: 50,
        backgroundColor: '#fff',
        shadowColor: '#000',
        elevation: 7,
    },

    title:{
        fontSize: 30,
        fontWeight: 'bold',
        //marginBottom: 20,
        padding: 10,
        color: '#3c3a55',
    },

    month:{
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#3c3a55',
    },

    graphContainer:{
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    }
})