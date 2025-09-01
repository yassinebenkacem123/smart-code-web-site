import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import useProfessorStore from '../store/useProfessorStore';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import MessageCard from '../components/MessageCard';
import Loading from '../components/Loading';
import ProfessorSendMessageBox from '../components/ProfessorSendMessageBox';

// Register Chart.js components for line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ProfessorStatistics = () => {
  const { professorStatistics,fetchStudentsMessages,studentsMessages ,fetchProfessorStatistics, loading, error, professorId } = useProfessorStore();

  useEffect(() => {
    fetchProfessorStatistics(professorId);
    fetchStudentsMessages(professorId);

  }, [fetchProfessorStatistics, professorId]);
  if (loading) {
    return (
      <Loading/>
    );
  }
  if (error) {
    return (
      <div className="w-full  flex justify-center items-center gap-3 py-12">
        <div className="text-red-500 bg-red-900/30 px-4 py-2 rounded-lg inline-block">
          {error}
        </div>
        <button 
          onClick={() => fetchProfessorStatistics(professorId)}
          className=" bg-sky-700/50 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (!professorStatistics) {
    return (
      <div className="text-center w-full flex items-center justify-center py-12">
        <div className="text-sky-300 bg-sky-900/30 p-4 rounded-lg inline-block">
          Aucune donnée statistique disponible
        </div>
      </div>
    );
  }

  // Prepare line chart data
  const chartData = {
    labels: professorStatistics.map(course => course.titre),
    datasets: [
      {
        label: "Nombre d'étudiants",
        data: professorStatistics.map(course => course.nombre_etudiants),
        borderColor: 'rgba(56, 189, 248, 1)',
        backgroundColor: 'rgba(56, 189, 248, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(14, 165, 233, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#cbd5e1',
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: "Évolution des inscriptions par cours",
        color: '#e2e8f0',
        font: {
          size: 18,
          weight: 'bold',
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#7dd3fc',
        bodyColor: '#e2e8f0',
        borderColor: 'rgba(56, 189, 248, 0.5)',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          // Show full course title in tooltip title
          title: function(tooltipItems) {
            const item = tooltipItems[0];
            return professorStatistics[item.dataIndex].titre;
          },
          // Show student count in tooltip body
          label: function(context) {
            return `Étudiants: ${context.parsed.y}`;
          },
          // Remove the label at the top of the tooltip
          beforeTitle: function() {
            return '';
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          maxRotation: 0,
          minRotation: 0,
          // Truncate labels to 3 words
          callback: function(value,) {
            const label = this.getLabelForValue(value);
            const words = label.split(' ');
            return words.length > 0
              ? words.slice(0, 1).join(' ') + '...' 
              : label;
          }
        },
        grid: {
          color: 'rgba(30, 41, 59, 0.5)',
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#94a3b8',
          stepSize: 1
        },
        grid: {
          color: 'rgba(30, 41, 59, 0.5)',
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    hover: {
      mode: 'nearest',
      intersect: true
    }
  };

  // Get top 3 courses
  const topCourses = [...professorStatistics]
    .sort((a, b) => b.nombre_etudiants - a.nombre_etudiants)
    .slice(0, 3);

  return (
    <div className="bg-gradient-to-br w-full from-[#0f172a] to-[#1e293b] p-4 md:p-6 shadow-xl shadow-sky-900/20 h-screen overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line Chart Section */}
        <div className="lg:col-span-2 bg-sky-900/20 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-sky-500/30">
          <div className="h-80">
            <Line data={chartData} options={chartOptions} />
          </div>
          <div className='mt-4  overflow-y-auto text-center'>
            <h1 className='text-xl font-bold'>Les Messages Des Etudiants</h1>
            {
              studentsMessages.length > 0 ? (
                <div className="mt-4 space-y-4">
                  <h1>total messages : {studentsMessages.length}</h1>
                  {studentsMessages.map((message, index) => (
                    <MessageCard key={index} message={message} />
                  ))}
                </div>
              ) : (
                <div className="text-sky-300 text-center mt-4">
                  Aucun message d'étudiant disponible
                </div>
              ) 
            }
          </div>
        </div>

        {/* Top Courses Section */}
        <div className="bg-sky-900/20 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-sky-500/30">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center">
            <span className="bg-sky-800/30 p-2 rounded-lg mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </span>
            Top 3 des Cours
          </h2>
          
          <div className="space-y-4">
            {topCourses.map((course, index) => (
              <div key={course.id} className="bg-gradient-to-r from-sky-900/40 to-blue-900/30 p-4 rounded-lg border border-sky-500/30 hover:border-sky-400/50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center mb-2">
                      <span className={`${
                        index === 0 ? 'bg-amber-900/80 text-white' :
                        index === 1 ? 'bg-sky-900/80 text-white' :
                        'bg-purple-900/80  text-white'
                      } rounded-full  w-11  flex items-center justify-center mr-3`}>
                        {index + 1}
                      </span>
                      <h3 className="text-lg font-semibold text-white">{course.titre}</h3>
                    </div>
                    <p className="text-sky-300 text-sm ml-11">{course.nombre_etudiants} étudiants</p>
                  </div>
                  
                  <div className="bg-emerald-900/30 text-emerald-300 px-3 py-1 rounded-full text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {course.nombre_etudiants}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-sky-700/50">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sky-300 text-sm">Total des cours</p>
                <p className="text-white text-xl font-bold">{professorStatistics.length}</p>
              </div>
              <div>
                <p className="text-sky-300 text-sm">Total des étudiants</p>
                <p className="text-white text-xl font-bold">
                  {professorStatistics.reduce((sum, course) => sum + course.nombre_etudiants, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className='mt-6 pt-4 border-t border-sky-700/50'>
            <ProfessorSendMessageBox />
          </div>
        </div>
     
      </div>
    </div>
  );
};

export default ProfessorStatistics;