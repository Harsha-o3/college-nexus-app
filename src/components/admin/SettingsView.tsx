
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Save, Database, Shield, Bell, Mail, Calendar } from 'lucide-react';
import { useState } from 'react';

const SettingsView = () => {
  const [systemSettings, setSystemSettings] = useState({
    instituteName: 'College Portal University',
    academicYear: '2023-2024',
    currentSemester: 'Spring 2024',
    attendanceThreshold: 75,
    passThreshold: 40,
    maxLoginAttempts: 3,
    sessionTimeout: 30,
    enableNotifications: true,
    enableEmailAlerts: true,
    enableSMSAlerts: false,
    allowSelfRegistration: false,
    requireEmailVerification: true,
    enableTwoFactorAuth: false,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.college.edu',
    smtpPort: 587,
    emailUsername: 'noreply@college.edu',
    emailPassword: '••••••••',
    enableTLS: true,
  });

  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    backupFrequency: 'daily',
    retentionDays: 30,
    backupLocation: '/backups/portal',
    lastBackup: '2024-01-20 02:00:00',
  });

  const handleSystemSettingChange = (key: string, value: any) => {
    setSystemSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleEmailSettingChange = (key: string, value: any) => {
    setEmailSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleBackupSettingChange = (key: string, value: any) => {
    setBackupSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', { systemSettings, emailSettings, backupSettings });
    alert('Settings saved successfully!');
  };

  const handleTestBackup = () => {
    console.log('Testing backup...');
    alert('Backup test initiated. Check system logs for results.');
  };

  const handleTestEmail = () => {
    console.log('Testing email configuration...');
    alert('Test email sent. Check your inbox.');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">System Settings</h2>
        <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>General Settings</span>
          </CardTitle>
          <CardDescription>Basic system configuration</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="instituteName">Institute Name</Label>
              <Input
                id="instituteName"
                value={systemSettings.instituteName}
                onChange={(e) => handleSystemSettingChange('instituteName', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                value={systemSettings.academicYear}
                onChange={(e) => handleSystemSettingChange('academicYear', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="currentSemester">Current Semester</Label>
              <Input
                id="currentSemester"
                value={systemSettings.currentSemester}
                onChange={(e) => handleSystemSettingChange('currentSemester', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="attendanceThreshold">Attendance Threshold (%)</Label>
              <Input
                id="attendanceThreshold"
                type="number"
                value={systemSettings.attendanceThreshold}
                onChange={(e) => handleSystemSettingChange('attendanceThreshold', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="passThreshold">Pass Threshold (%)</Label>
              <Input
                id="passThreshold"
                type="number"
                value={systemSettings.passThreshold}
                onChange={(e) => handleSystemSettingChange('passThreshold', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={systemSettings.maxLoginAttempts}
                onChange={(e) => handleSystemSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security & Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Security & Authentication</span>
          </CardTitle>
          <CardDescription>Configure security settings and authentication options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Self Registration</Label>
                <p className="text-sm text-gray-600">Allow users to register themselves</p>
              </div>
              <Switch
                checked={systemSettings.allowSelfRegistration}
                onCheckedChange={(checked) => handleSystemSettingChange('allowSelfRegistration', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-gray-600">Verify email addresses on signup</p>
              </div>
              <Switch
                checked={systemSettings.requireEmailVerification}
                onCheckedChange={(checked) => handleSystemSettingChange('requireEmailVerification', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Enable 2FA for all users</p>
              </div>
              <Switch
                checked={systemSettings.enableTwoFactorAuth}
                onCheckedChange={(checked) => handleSystemSettingChange('enableTwoFactorAuth', checked)}
              />
            </div>
            <div>
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={systemSettings.sessionTimeout}
                onChange={(e) => handleSystemSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="h-5 w-5" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>Configure notification preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable System Notifications</Label>
                <p className="text-sm text-gray-600">Show in-app notifications</p>
              </div>
              <Switch
                checked={systemSettings.enableNotifications}
                onCheckedChange={(checked) => handleSystemSettingChange('enableNotifications', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Email Alerts</Label>
                <p className="text-sm text-gray-600">Send important alerts via email</p>
              </div>
              <Switch
                checked={systemSettings.enableEmailAlerts}
                onCheckedChange={(checked) => handleSystemSettingChange('enableEmailAlerts', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable SMS Alerts</Label>
                <p className="text-sm text-gray-600">Send critical alerts via SMS</p>
              </div>
              <Switch
                checked={systemSettings.enableSMSAlerts}
                onCheckedChange={(checked) => handleSystemSettingChange('enableSMSAlerts', checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Configuration</span>
          </CardTitle>
          <CardDescription>Configure SMTP settings for outgoing emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="smtpServer">SMTP Server</Label>
              <Input
                id="smtpServer"
                value={emailSettings.smtpServer}
                onChange={(e) => handleEmailSettingChange('smtpServer', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                type="number"
                value={emailSettings.smtpPort}
                onChange={(e) => handleEmailSettingChange('smtpPort', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="emailUsername">Email Username</Label>
              <Input
                id="emailUsername"
                value={emailSettings.emailUsername}
                onChange={(e) => handleEmailSettingChange('emailUsername', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="emailPassword">Email Password</Label>
              <Input
                id="emailPassword"
                type="password"
                value={emailSettings.emailPassword}
                onChange={(e) => handleEmailSettingChange('emailPassword', e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable TLS</Label>
              <p className="text-sm text-gray-600">Use TLS encryption for email</p>
            </div>
            <Switch
              checked={emailSettings.enableTLS}
              onCheckedChange={(checked) => handleEmailSettingChange('enableTLS', checked)}
            />
          </div>
          <Button onClick={handleTestEmail} variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Test Email Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Database className="h-5 w-5" />
            <span>Backup Settings</span>
          </CardTitle>
          <CardDescription>Configure automatic backup settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Automatic Backup</Label>
                <p className="text-sm text-gray-600">Schedule regular backups</p>
              </div>
              <Switch
                checked={backupSettings.autoBackup}
                onCheckedChange={(checked) => handleBackupSettingChange('autoBackup', checked)}
              />
            </div>
            <div>
              <Label htmlFor="backupFrequency">Backup Frequency</Label>
              <select
                id="backupFrequency"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={backupSettings.backupFrequency}
                onChange={(e) => handleBackupSettingChange('backupFrequency', e.target.value)}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div>
              <Label htmlFor="retentionDays">Retention Period (Days)</Label>
              <Input
                id="retentionDays"
                type="number"
                value={backupSettings.retentionDays}
                onChange={(e) => handleBackupSettingChange('retentionDays', parseInt(e.target.value))}
              />
            </div>
            <div>
              <Label htmlFor="backupLocation">Backup Location</Label>
              <Input
                id="backupLocation"
                value={backupSettings.backupLocation}
                onChange={(e) => handleBackupSettingChange('backupLocation', e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium">Last Backup</p>
              <p className="text-sm text-gray-600">{backupSettings.lastBackup}</p>
            </div>
            <Badge variant="default">Success</Badge>
          </div>
          <Button onClick={handleTestBackup} variant="outline">
            <Database className="h-4 w-4 mr-2" />
            Test Backup Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
