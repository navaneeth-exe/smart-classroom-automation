import React from 'react';
import { ClassroomStructure } from './ClassroomStructure';
import { Blackboard } from './Blackboard';
import { TeacherDesk } from './TeacherDesk';
import { StudentDesk } from './StudentDesk';
import { CeilingFan } from './CeilingFan';
import { CeilingLight } from './CeilingLight';
import { ClassroomDecor } from './ClassroomDecor';
import { SensorPlaceholders } from './SensorPlaceholders';
import { Student } from './Student';
import { useClassroomStore } from '../../store/classroomStore';
import { 
  CLASSROOM_DESK_CONFIG, 
  CEILING_FAN_CONFIG, 
  CEILING_LIGHT_CONFIG 
} from './classroomConfig';

interface ClassroomSceneProps {
  /** Optional external overrides (for presentation mode) */
  doorRotationY?: number;
  fanSpeed?: number;
  lightsOn?: boolean;
  lightIntensity?: number;
  onDeskHover?: (id: number | null) => void;
}

export const ClassroomScene: React.FC<ClassroomSceneProps> = ({
  doorRotationY: externalDoorY,
  fanSpeed: externalFanSpeed,
  lightsOn: externalLightsOn,
  lightIntensity = 1.0,
  onDeskHover,
}) => {
  // Read live simulation state from the unified store
  const students = useClassroomStore((state) => state.students);
  const storeDoorY = useClassroomStore((state) => state.doorRotationY);
  const storeFanSpeed = useClassroomStore((state) => state.fanSpeed);
  const storeFanState = useClassroomStore((state) => state.fanState);
  const storeLightState = useClassroomStore((state) => state.lightState);
  const pirDetected = useClassroomStore((state) => state.pirDetected);
  const temperature = useClassroomStore((state) => state.temperature);
  const humidity = useClassroomStore((state) => state.humidity);
  const storeLightIntensity = useClassroomStore((state) => state.lightIntensity);
  const occupancy = useClassroomStore((state) => state.occupancy);
  const selectedInfo = useClassroomStore((state) => state.selectedInfo);
  const setSelectedInfo = useClassroomStore((state) => state.setSelectedInfo);

  // External override or live simulation value
  const resolvedDoorY = externalDoorY !== undefined ? externalDoorY : storeDoorY;
  const resolvedFanSpeed = externalFanSpeed !== undefined ? externalFanSpeed : storeFanSpeed;
  const resolvedLightsOn = externalLightsOn !== undefined ? externalLightsOn : storeLightState;

  // Selected sensor type helper
  const selectedSensorType = selectedInfo?.objectType === 'PIR' 
    ? 'PIR' 
    : selectedInfo?.objectType === 'LDR' 
    ? 'LDR' 
    : selectedInfo?.objectType === 'TEMPERATURE' 
    ? 'TEMPERATURE' 
    : null;

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Structural Architecture: Floor, Walls, Windows, Door, Ceiling Grid */}
      <ClassroomStructure doorRotationY={resolvedDoorY} />

      {/* 2. Front Presentation Area: Chalkboard / Smartboard */}
      <Blackboard 
        onClick={() => setSelectedInfo({
          title: 'Interactive Smartboard & Blackboard',
          category: 'CLASSROOM FACILITY',
          objectType: 'BOARD',
          targetPosition: [0, 1.8, -3.8],
          description: 'Front interactive display illustrating the closed-loop Smart Classroom digital twin block diagram and lecture chalk board.',
          details: 'Central point of lecture presentation.'
        })}
      />

      {/* 3. Instructor Area: Executive Teacher Desk & Swivel Chair */}
      <TeacherDesk />

      {/* 4. Student Seating Grid (16 configured desks in 4x4 matrix with central aisle) */}
      <group>
        {CLASSROOM_DESK_CONFIG.map((desk) => {
          const isOccupied = students.some((s) => s.deskId === desk.id && (s.state === 'IDLE' || s.state === 'SITTING'));
          return (
            <StudentDesk
              key={desk.id}
              id={desk.id}
              deskPosition={desk.deskPosition}
              chairPosition={desk.chairPosition}
              isOccupied={isOccupied}
              onPointerOver={() => onDeskHover?.(desk.id)}
              onPointerOut={() => onDeskHover?.(null)}
              onClick={() => setSelectedInfo({
                title: `Student Station #${desk.id + 1}`,
                category: 'FURNITURE',
                objectType: 'DESK',
                targetPosition: [desk.deskPosition[0], 1.2, desk.deskPosition[2]],
                description: `Ergonomic desk and chair station located at Row ${desk.row + 1}, Column ${desk.col + 1}.`,
                details: isOccupied ? 'Status: Currently occupied by student' : 'Status: Available for student seating'
              })}
            />
          );
        })}
      </group>

      {/* 5. Active Dynamic 3D Students */}
      <group>
        {students.map((student) => (
          <Student
            key={student.id}
            data={student}
            onClick={() => setSelectedInfo({
              title: `Student (${student.id.split('-')[1]})`,
              category: 'OCCUPANT AGENT',
              objectType: 'STUDENT',
              targetPosition: [student.currentPosition[0], 1.2, student.currentPosition[2]],
              description: `Autonomous college student agent. Current state: ${student.state}. Seated at Desk #${student.deskId + 1}.`,
              details: `Dynamic 3D humanoid with randomized apparel palette.`
            })}
          />
        ))}
      </group>

      {/* 6. Overhead Actuators: 4 Ceiling Fans — driven by simulation fanSpeed */}
      <group>
        {CEILING_FAN_CONFIG.map((pos, idx) => {
          const isFanSelected = selectedInfo?.objectType === 'FAN' && selectedInfo?.title === `Ceiling Fan #${idx + 1}`;
          return (
            <CeilingFan 
              key={`fan-${idx}`} 
              position={pos} 
              fanSpeed={resolvedFanSpeed} 
              isSelected={isFanSelected}
              onClick={() => setSelectedInfo({
                title: `Ceiling Fan #${idx + 1}`,
                category: 'SMART ACTUATOR',
                objectType: 'FAN',
                targetPosition: pos,
                description: 'Ceiling Fan\nStatus: ' + (storeFanState || resolvedFanSpeed > 0 ? 'ON' : 'OFF') + '\nSpeed: ' + resolvedFanSpeed + '%\nPWM: ' + resolvedFanSpeed + '%',
                details: `Dynamic speed interpolated from simulation temperature.`
              })}
            />
          );
        })}
      </group>

      {/* 7. Overhead Actuators: 6 Recessed Troffer Ceiling Lights — driven by simulation lightState */}
      <group>
        {CEILING_LIGHT_CONFIG.map((pos, idx) => {
          const isLightSelected = selectedInfo?.objectType === 'LIGHT' && selectedInfo?.title === `Ceiling Light #${idx + 1}`;
          return (
            <CeilingLight
              key={`light-${idx}`}
              position={pos}
              isOn={resolvedLightsOn}
              intensity={lightIntensity}
              isSelected={isLightSelected}
              onClick={() => setSelectedInfo({
                title: `Ceiling Light #${idx + 1}`,
                category: 'SMART ACTUATOR',
                objectType: 'LIGHT',
                targetPosition: pos,
                description: 'Ceiling Light\nStatus: ' + (resolvedLightsOn ? 'ON' : 'OFF') + '\nBrightness: ' + (resolvedLightsOn ? '100% (Simulated illumination)' : '0% (Standby)'),
                details: `Co-dependent automation gate: Occupancy > 0 AND Ambient Light < 40%.`
              })}
            />
          );
        })}
      </group>

      {/* 8. Academic Decorations */}
      <ClassroomDecor />

      {/* 9. Virtual Sensor Visual Enclosures */}
      <SensorPlaceholders 
        pirDetected={pirDetected}
        selectedSensor={selectedSensorType}
        onPirClick={() => setSelectedInfo({
          title: 'Virtual PIR Sensor',
          category: 'OCCUPANCY SENSOR',
          objectType: 'PIR',
          targetPosition: [4.8, 3.2, 2.5],
          description: 'Virtual PIR Sensor\nStatus: ' + (pirDetected ? 'Detected' : 'Clear') + '\nOccupancy: ' + occupancy,
          details: pirDetected ? 'Active human motion signal latched.' : 'Zero thermal motion vectors detected.'
        })}
        onLdrClick={() => setSelectedInfo({
          title: 'Virtual Light Sensor (LDR)',
          category: 'ILLUMINANCE SENSOR',
          objectType: 'LDR',
          targetPosition: [-5.6, 2.3, 0],
          description: 'Virtual Light Sensor\nAmbient Light: ' + storeLightIntensity.toFixed(0) + '%',
          details: `Setpoint threshold: 40% ambient daylight lux.`
        })}
        onDht22Click={() => setSelectedInfo({
          title: 'Virtual Temperature Sensor (DHT22)',
          category: 'ENVIRONMENTAL SENSOR',
          objectType: 'TEMPERATURE',
          targetPosition: [-5.6, 1.6, -2.5],
          description: 'Virtual Temperature Sensor\nTemperature: ' + temperature.toFixed(1) + '°C\nHumidity: ' + humidity.toFixed(0) + '%',
          details: `Feeds closed-loop temperature-to-PWM regulation algorithm.`
        })}
      />
    </group>
  );
};
