import { useState } from 'react'
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  InputAdornment, 
  IconButton,
  Alert,
  Divider,
  CircularProgress
} from '@mui/material'
import { 
  Email, 
  Lock, 
  Visibility, 
  VisibilityOff,
  Google
} from '@mui/icons-material'
import { useAuth } from '../../../hooks/useAuth'

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다'
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요'
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    try {
      const result = await login(formData)
      if (result.success) {
        // 로그인 성공 시 처리 (예: 홈으로 이동)
        console.log('로그인 성공')
      } else {
        setErrors({ general: result.error || '로그인에 실패했습니다.' })
      }
    } catch (error) {
      setErrors({ general: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.' })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      // Google 로그인 로직 구현 예정
      console.log('Google 로그인 시도')
    } catch (error) {
      setErrors({ general: 'Google 로그인에 실패했습니다.' })
    } finally {
      setLoading(false)
    }
  }

  const handleKakaoLogin = async () => {
    setLoading(true)
    try {
      // Kakao 로그인 로직 구현 예정
      console.log('Kakao 로그인 시도')
    } catch (error) {
      setErrors({ general: 'Kakao 로그인에 실패했습니다.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        width: '100%',
        maxWidth: { xs: '100%', sm: '400px' },
        mx: 'auto',
        px: { xs: 2, sm: 0 }
      }}
    >
      {/* Error Alert */}
      {errors.general && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
          {errors.general}
        </Alert>
      )}

      {/* Email Field */}
      <TextField
        name="email"
        type="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleChange}
        error={!!errors.email}
        helperText={errors.email}
        fullWidth
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: '#f9fafb',
            '& fieldset': {
              borderColor: '#e5e7eb'
            },
            '&:hover fieldset': {
              borderColor: '#667eea'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#667eea'
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email sx={{ color: '#6b7280' }} />
            </InputAdornment>
          )
        }}
      />

      {/* Password Field */}
      <TextField
        name="password"
        type={showPassword ? 'text' : 'password'}
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange}
        error={!!errors.password}
        helperText={errors.password}
        fullWidth
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            bgcolor: '#f9fafb',
            '& fieldset': {
              borderColor: '#e5e7eb'
            },
            '&:hover fieldset': {
              borderColor: '#667eea'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#667eea'
            }
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock sx={{ color: '#6b7280' }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                sx={{ color: '#6b7280' }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      {/* Login Button */}
      <Button
        type="submit"
        variant="contained"
        fullWidth
        disabled={loading}
        sx={{
          py: 1.5,
          mb: 2,
          borderRadius: 2,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          fontWeight: 600,
          fontSize: 16,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
            boxShadow: '0 6px 16px rgba(102, 126, 234, 0.6)'
          },
          '&:disabled': {
            background: '#d1d5db',
            boxShadow: 'none'
          }
        }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : '로그인'}
      </Button>

      {/* Forgot Password */}
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography
          variant="body2"
          sx={{
            color: '#667eea',
            cursor: 'pointer',
            fontWeight: 500,
            '&:hover': {
              textDecoration: 'underline'
            }
          }}
        >
          비밀번호를 잊으셨나요?
        </Typography>
      </Box>

      {/* Divider */}
      <Divider sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ color: '#6b7280', px: 2 }}>
          또는
        </Typography>
      </Divider>

      {/* Social Login Buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {/* Google Login */}
        <Button
          onClick={handleGoogleLogin}
          variant="outlined"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            borderColor: '#e5e7eb',
            color: '#374151',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              borderColor: '#667eea',
              bgcolor: '#f8f9ff'
            }
          }}
          startIcon={<Google />}
        >
          Google로 로그인
        </Button>

        {/* Kakao Login */}
        <Button
          onClick={handleKakaoLogin}
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: '#FEE500',
            color: '#000000',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              bgcolor: '#FDD835'
            },
            '&:disabled': {
              bgcolor: '#d1d5db',
              color: '#6b7280'
            }
          }}
          startIcon={
            <Box sx={{ 
              width: 20, 
              height: 20, 
              borderRadius: '50%',
              bgcolor: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 'bold',
              color: '#FEE500'
            }}>
              K
            </Box>
          }
        >
          Kakao로 로그인
        </Button>
      </Box>
    </Box>
  )
}

export default LoginForm